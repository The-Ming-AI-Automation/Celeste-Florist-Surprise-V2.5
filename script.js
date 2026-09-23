(function () {
  "use strict";

  const config = window.DEMO_CONFIG;
  if (!config) throw new Error("Missing demo-config.js");

  let language = config.defaultLanguage === "en" ? "en" : "zh";
  let selectedJourney = "love";
  let mediaRecorder = null;
  let microphoneStream = null;
  let recordingChunks = [];
  let recordingStartedAt = 0;
  let recordingTimer = null;
  let recordingUrl = null;
  let hasRecordedVoice = false;

  const dialog = document.querySelector("#personalize-dialog");
  const form = document.querySelector("#personalize-form");
  const recordButton = document.querySelector("#record-button");
  const recordLabel = document.querySelector("#record-label");
  const recordTime = document.querySelector("#record-time");
  const recordStatus = document.querySelector("#record-status");
  const recordingPreview = document.querySelector("#recording-preview");
  const clearRecordingButton = document.querySelector("#clear-recording");
  const launchButton = document.querySelector(".launch-button");
  const suggestions = document.querySelector("#writing-suggestions");

  function text(key) {
    return config.content[language]?.[key] || config.content.en[key] || key;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[character]));
  }

  function buildWritingIdeas() {
    const recipient = document.querySelector("#demo-recipient").value.trim() || text("recipientPlaceholder");
    const sender = document.querySelector("#demo-sender").value.trim() || text("senderPlaceholder");
    const occasion = document.querySelector("#demo-occasion").value.trim() || text("aiDefaultOccasion");
    const memory = document.querySelector("#demo-memory").value.trim() || text("aiDefaultMemory");
    const tone = document.querySelector("#demo-tone").value;
    const templates = {
      zh: {
        warm: [`${recipient}，${occasion}快乐。谢谢你把平凡的日子，慢慢变成我最想珍藏的画面。`, `我一直记得${memory}。愿接下来的每一天，也都有我陪你一起记住。`, `这份小惊喜，送给我最在乎的你。— ${sender}`],
        playful: [`${recipient}，今天的任务很简单：收下这份${occasion}的小惊喜，然后继续被我喜欢。`, `从${memory}开始，你已经悄悄占据了我太多快乐的瞬间。`, `恭喜解锁：${sender} 想陪你继续创造更多回忆。`],
        poetic: [`${recipient}，愿${occasion}像一盏小灯，照亮我们已经走过、也将继续走过的路。`, `我把${memory}藏进心里，才发现原来爱，是无数个被记得的细节。`, `愿你每次回头，都能看见我在。— ${sender}`]
      },
      en: {
        warm: [`${recipient}, happy ${occasion}. Thank you for turning ordinary days into moments I want to keep.`, `I still think about ${memory}. I hope we get to keep remembering the little things together.`, `This small surprise is for the person I care about most. — ${sender}`],
        playful: [`${recipient}, your only task today: accept this little ${occasion} surprise and let me keep liking you.`, `Ever since ${memory}, you have quietly claimed so many of my happiest moments.`, `Achievement unlocked: ${sender} wants to make many more memories with you.`],
        poetic: [`${recipient}, may this ${occasion} be a small light for the road we have travelled and the one still ahead.`, `I kept ${memory} close and realised love lives in the details we choose to remember.`, `Whenever you look back, I hope you find me there. — ${sender}`]
      },
      bm: {
        warm: [`${recipient}, selamat ${occasion}. Terima kasih kerana menjadikan hari biasa sebagai kenangan yang saya mahu simpan.`, `Saya masih ingat ${memory}. Semoga kita terus menghargai perkara kecil bersama-sama.`, `Kejutan kecil ini untuk insan yang paling saya sayangi. — ${sender}`],
        playful: [`${recipient}, tugasan hari ini mudah: terima kejutan ${occasion} ini dan biarkan saya terus menyayangi awak.`, `Sejak ${memory}, awak telah memenuhi begitu banyak detik gembira saya.`, `Pencapaian dibuka: ${sender} mahu cipta lebih banyak kenangan dengan awak.`],
        poetic: [`${recipient}, semoga ${occasion} ini menjadi cahaya kecil untuk perjalanan yang telah dan akan kita lalui.`, `Saya simpan ${memory} dekat di hati, lalu sedar cinta hidup dalam perkara kecil yang kita ingati.`, `Setiap kali awak menoleh, saya harap awak nampak saya di sana. — ${sender}`]
      }
    };
    const labels = [text("aiIdeaShort"), text("aiIdeaMemory"), text("aiIdeaFinal")];
    suggestions.innerHTML = templates[document.querySelector("#demo-language").value]?.[tone].map((idea, index) => `<article class="suggestion-card"><strong>${escapeHtml(labels[index])}</strong><p>${escapeHtml(idea)}</p><button type="button" data-use-idea="${index}">${escapeHtml(text("aiUse"))}</button></article>`).join("") || "";
    suggestions.hidden = false;
    suggestions.querySelectorAll("[data-use-idea]").forEach(button => button.addEventListener("click", () => {
      const selected = templates[document.querySelector("#demo-language").value][tone][Number(button.dataset.useIdea)];
      document.querySelector("#demo-ending").value = selected;
      document.querySelector("#demo-ending").focus();
    }));
  }

  function applyLanguage(next) {
    language = next;
    document.documentElement.lang = language === "zh" ? "zh-MY" : "en";
    document.querySelectorAll("[data-lang]").forEach(button => button.classList.toggle("active", button.dataset.lang === language));
    document.querySelectorAll("[data-copy]").forEach(element => {
      const value = text(element.dataset.copy);
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-placeholder]").forEach(element => {
      const value = text(element.dataset.placeholder);
      if (value) element.placeholder = value;
    });
    recordLabel.textContent = mediaRecorder && mediaRecorder.state === "recording"
      ? config.content[language].recordStop
      : config.content[language].recordStart;
  }

  function openVoiceDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("surprise-diy-preview", 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains("media")) request.result.createObjectStore("media");
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function saveVoiceRecording(blob) {
    const database = await openVoiceDatabase();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction("media", "readwrite");
      transaction.objectStore("media").put(blob, "voice-message");
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
    database.close();
  }

  async function clearVoiceRecording() {
    try {
      const database = await openVoiceDatabase();
      await new Promise((resolve, reject) => {
        const transaction = database.transaction("media", "readwrite");
        transaction.objectStore("media").delete("voice-message");
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
      });
      database.close();
    } catch (error) {
      // The demo still works if browser storage cleanup is unavailable.
    }
    hasRecordedVoice = false;
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    recordingUrl = null;
    recordingPreview.pause();
    recordingPreview.removeAttribute("src");
    recordingPreview.hidden = true;
    clearRecordingButton.hidden = true;
    recordStatus.textContent = "";
    recordTime.textContent = "0:00";
  }

  function formatTime(seconds) {
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  }

  function stopMicrophoneTracks() {
    if (microphoneStream) microphoneStream.getTracks().forEach(track => track.stop());
    microphoneStream = null;
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") mediaRecorder.stop();
  }

  async function startRecording() {
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error("Recording unavailable");
      await clearVoiceRecording();
      microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const types = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm", "audio/ogg;codecs=opus"];
      const supportedType = types.find(type => typeof MediaRecorder.isTypeSupported !== "function" || MediaRecorder.isTypeSupported(type));
      mediaRecorder = supportedType ? new MediaRecorder(microphoneStream, { mimeType: supportedType }) : new MediaRecorder(microphoneStream);
      recordingChunks = [];
      mediaRecorder.addEventListener("dataavailable", event => { if (event.data.size) recordingChunks.push(event.data); });
      mediaRecorder.addEventListener("stop", async () => {
        clearInterval(recordingTimer);
        recordButton.classList.remove("recording");
        recordLabel.textContent = config.content[language].recordStart;
        const blob = new Blob(recordingChunks, { type: mediaRecorder.mimeType || "audio/webm" });
        stopMicrophoneTracks();
        if (!blob.size) return;
        try {
          await saveVoiceRecording(blob);
          hasRecordedVoice = true;
          recordingUrl = URL.createObjectURL(blob);
          recordingPreview.src = recordingUrl;
          recordingPreview.hidden = false;
          clearRecordingButton.hidden = false;
          recordStatus.textContent = config.content[language].recordReady;
        } catch (error) {
          recordStatus.textContent = config.content[language].recordError;
        } finally {
          launchButton.disabled = false;
        }
      }, { once: true });
      mediaRecorder.start(250);
      recordingStartedAt = Date.now();
      recordButton.classList.add("recording");
      recordLabel.textContent = config.content[language].recordStop;
      recordStatus.textContent = "";
      launchButton.disabled = true;
      recordingTimer = setInterval(() => {
        const elapsed = (Date.now() - recordingStartedAt) / 1000;
        recordTime.textContent = formatTime(elapsed);
        if (elapsed >= 60) stopRecording();
      }, 250);
    } catch (error) {
      stopMicrophoneTracks();
      recordButton.classList.remove("recording");
      recordLabel.textContent = config.content[language].recordStart;
      recordStatus.textContent = config.content[language].recordError;
      launchButton.disabled = false;
    }
  }

  function launchPreview(personalized) {
    const values = personalized ? {
      recipientName: document.querySelector("#demo-recipient").value.trim(),
      senderName: document.querySelector("#demo-sender").value.trim(),
      language: document.querySelector("#demo-language").value,
      finalMessage: document.querySelector("#demo-ending").value.trim(),
      journey: selectedJourney,
      hasVoice: hasRecordedVoice
    } : {
      recipientName: language === "zh" ? "特别的你" : "Someone Special",
      senderName: language === "zh" ? "在乎你的人" : "Someone Who Cares",
      language: language === "zh" ? "zh" : "en",
      finalMessage: "",
      journey: selectedJourney,
      hasVoice: false
    };
    sessionStorage.setItem("surpriseDemoPersonalization", JSON.stringify(values));
    const url = new URL(config.previewBasePath, location.href);
    url.searchParams.set("preview", "1");
    url.searchParams.set("personalized", personalized ? "1" : "0");
    url.searchParams.set("journey", selectedJourney);
    location.href = url.href;
  }

  function openPersonalization(journey) {
    selectedJourney = journey;
    document.querySelector("#selected-journey").value = journey;
    document.querySelector("#demo-language").value = language === "zh" ? "zh" : "en";
    dialog.showModal();
    setTimeout(() => document.querySelector("#demo-recipient").focus(), 100);
  }

  document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
  document.querySelectorAll("[data-preview]").forEach(button => button.addEventListener("click", () => openPersonalization(button.dataset.preview)));
  document.querySelector("#personalize-close").addEventListener("click", () => { stopRecording(); dialog.close(); });
  dialog.addEventListener("click", event => { if (event.target === dialog) { stopRecording(); dialog.close(); } });
  recordButton.addEventListener("click", () => mediaRecorder?.state === "recording" ? stopRecording() : startRecording());
  document.querySelector("#assist-writing").addEventListener("click", buildWritingIdeas);
  clearRecordingButton.addEventListener("click", clearVoiceRecording);
  document.querySelector("#skip-personalization").addEventListener("click", async () => { await clearVoiceRecording(); launchPreview(false); });
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (mediaRecorder?.state === "recording") {
      stopRecording();
      return;
    }
    if (form.reportValidity()) launchPreview(true);
  });

  document.querySelector("#brand-name").textContent = config.brandName;
  document.querySelector("#footer-brand").textContent = config.brandName;
  document.querySelector("#footer-partner").textContent = config.partnerName;
  document.querySelector("#instagram-link").href = config.instagramUrl;

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.13 });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
  addEventListener("scroll", () => document.querySelector(".site-header").classList.toggle("scrolled", scrollY > 24), { passive: true });

  const canvas = document.querySelector("#ambient-canvas");
  const ctx = canvas.getContext("2d");
  const points = [];
  let width, height, dpr;
  for (let i = 0; i < 140; i++) points.push({ x: Math.random(), y: Math.random(), r: 0.3 + Math.random() * 1.1, a: 0.05 + Math.random() * 0.25, p: Math.random() * 6.28 });
  function resize() {
    width = innerWidth;
    height = innerHeight;
    dpr = Math.min(devicePixelRatio || 1, 1.6);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw(now) {
    ctx.clearRect(0, 0, width, height);
    points.forEach(point => {
      ctx.fillStyle = `rgba(208,166,109,${point.a * (0.7 + Math.sin(now * 0.0008 + point.p) * 0.3)})`;
      ctx.beginPath();
      ctx.arc(point.x * width, point.y * height, point.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
  applyLanguage(language);
})();
