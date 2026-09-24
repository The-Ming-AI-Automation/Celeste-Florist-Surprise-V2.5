/*
  Surprise Website V2 — flat-file edition
  No npm, build tools, modules, libraries, or asset folders required.
  All client-specific values live in client-config.js.
*/

(function () {
  "use strict";

  const CONFIG = window.SURPRISE_CONFIG;
  if (!CONFIG) throw new Error("Missing client-config.js");
  const routeParams = new URLSearchParams(location.search);
  const previewMode = routeParams.get("preview") === "1";
  const personalizedMode = previewMode && routeParams.get("personalized") === "1";
  const routedJourney = ["love", "birthday", "date"].includes(routeParams.get("journey")) ? routeParams.get("journey") : null;
  let demoPersonalization = null;
  if (personalizedMode) {
    try {
      const stored = JSON.parse(sessionStorage.getItem("surpriseDemoPersonalization") || "null");
      if (stored && typeof stored === "object") {
        demoPersonalization = stored;
        if (stored.recipientName) CONFIG.recipientName = String(stored.recipientName).slice(0, 28);
        if (stored.senderName) CONFIG.senderName = String(stored.senderName).slice(0, 28);
        if (["en", "bm", "zh"].includes(stored.language)) CONFIG.defaultLanguage = stored.language;
      }
    } catch (error) {
      demoPersonalization = null;
    }
  }
  const recipient = String(CONFIG.recipientName || "Someone Special");
  const sender = String(CONFIG.senderName || "Someone Who Cares");
  const fillClientTokens = value => String(value || "")
    .replaceAll("{recipient}", recipient)
    .replaceAll("{recipientUpper}", recipient.toUpperCase())
    .replaceAll("{sender}", sender)
    .replaceAll("{senderUpper}", sender.toUpperCase());

  const copy = {
    en: {
      privateFor: `MADE ESPECIALLY FOR ${recipient.toUpperCase()}`,
      lockTitle: "This surprise belongs to someone special.",
      lockBody: "Enter the four numbers that mean something to both of you.",
      hintLabel: "Hint:", hintText: "The day our story began",
      unlock: "Unlock the surprise", wrong: "Almost. Think of a day that belongs to us.",
      heroKicker: "A LITTLE PLACE FOR A BIG LOVE", heroTitle: "I made a small place for your story.",
      heroBody: "Take a breath. Turn up the sound. Let their memory unfold.", enter: "Enter their story",
      selectKicker: "CHOOSE A MOMENT", selectTitle: "Choose the way you want to remember.",
      forLove: "Welcome Home", forBirthday: "Pet Birthday", forDate: "In Loving Memory",
      ready: "Ready", comingNext: "Coming next", chooseHint: "Choose a surprise to continue.",
      releaseKicker: "THE LITTLE THINGS WE KEEP", releaseTitle: "Every light holds a piece of them.",
      releaseBody: "Move gently. When you are ready, let the memories appear.", release: "Release the memories",
      memoryKicker: "SIX LITTLE MOMENTS", memoryTitle: "Every piece of this leads back to them.",
      memoryHint: "Tap a memory to bring it closer.", finaleButton: "Discover the final message →",
      finaleKicker: "THE FINAL LETTER", finaleTitle: "A love this big always leaves a little light.",
      finaleBody: "Thank you for every ordinary day you made extraordinary.", replay: "Replay the moment",
      dateAnswer: "Keep this memory close ♡", cinemaKicker: "A LITTLE FILM OF US",
      cinemaOpening: "A little story is about to begin.",
      cinemaStatus: "A little film made from the moments you shared.", cinemaContinue: "Reveal the letter",
      musicUnavailable: "Couldn’t play the soundtrack. Confirm the configured file exists and is genuinely encoded as MP3.",
      birthdayMoment: "A BIRTHDAY WISH", birthdayMakeWish: `Make a wish, ${recipient}.`,
      birthdayBlown: "Your wish is becoming a memory.", enableMicrophone: "Enable microphone",
      microphonePrivacy: "Audio is analysed only on this device and is never recorded.",
      microphoneCalibrating: "Listening to the room…", blowInstruction: "Please blow the candle near your microphone.",
      microphoneError: "Microphone access was unavailable. You can still continue.", tapToBlow: "Tap here to blow the candle",
      invitationKicker: "ADMIT TWO · ONE SPECIAL EVENING", preparedFor: "Prepared especially for",
      movieLabel: "Movie", dateLabel: "Date", timeLabel: "Time", locationLabel: "Location", dressCodeLabel: "Dress code",
      openMap: "Open in Maps", addCalendar: "Add to Calendar", replyWhatsapp: "Reply on WhatsApp",
      voiceIntro: "There’s something I want you to hear.", playVoice: "Play my message", pauseVoice: "Pause my message",
      voiceUnavailable: "Couldn’t play the personal message. Upload the configured voice MP3 to the repository root.", previewReturn: "← Back to preview menu"
    },
    bm: {
      privateFor: `DIBUAT KHAS UNTUK ${recipient.toUpperCase()}`,
      lockTitle: "Kejutan ini milik seseorang yang istimewa.",
      lockBody: "Masukkan empat nombor yang bermakna untuk kamu berdua.",
      hintLabel: "Petunjuk:", hintText: "Hari kisah kita bermula",
      unlock: "Buka kejutan ini", wrong: "Hampir. Fikirkan hari yang menjadi milik kita.",
      heroKicker: "SATU DETIK KECIL, TERCIPTA DARIPADA KITA", heroTitle: "Saya sediakan satu kejutan kecil untuk awak.",
      heroBody: "Tarik nafas. Naikkan bunyi. Biarkan detik ini bermula.", enter: "Masuk ke kisah kita",
      selectKicker: "PILIH SATU DETIK", selectTitle: "Pilih bentuk kejutan anda.",
      forLove: "Untuk Cinta", forBirthday: "Untuk Hari Jadi", forDate: "Untuk Temu Janji",
      ready: "Sedia", comingNext: "Akan datang", chooseHint: "Pilih satu kejutan untuk meneruskan.",
      releaseKicker: "KENANGAN KITA, DISATUKAN", releaseTitle: "Setiap cahaya menyimpan sebahagian daripada kita.",
      releaseBody: "Gerak perlahan. Apabila bersedia, lepaskan kenangan ini.", release: "Lepaskan kenangan",
      memoryKicker: "ENAM DETIK KECIL", memoryTitle: "Setiap cebisan ini membawa saya kembali kepada awak.",
      memoryHint: "Sentuh kenangan untuk melihatnya dengan lebih dekat.", finaleButton: "Temui mesej terakhir →",
      finaleKicker: "PENDEDAHAN TERAKHIR", finaleTitle: "Langit yang sama. Hari yang berbeza. Tetap kita.",
      finaleBody: "Terima kasih kerana menjadikan detik biasa begitu bermakna.", replay: "Main semula",
      dateAnswer: "Ya — kita keluar bersama ♥", cinemaKicker: "TAYANGAN MALAM INI",
      cinemaOpening: "Tayangan istimewa akan bermula sebentar lagi.",
      cinemaStatus: "Sebuah filem kecil daripada detik-detik kita.", cinemaContinue: "Lihat jemputan",
      musicUnavailable: "Muzik tidak dapat dimainkan. Pastikan fail yang ditetapkan wujud dan benar-benar dikodkan sebagai MP3.",
      birthdayMoment: "SATU HARAPAN HARI JADI", birthdayMakeWish: `Buat satu harapan, ${recipient}.`,
      birthdayBlown: "Harapan awak sedang menjadi sebuah kenangan.", enableMicrophone: "Aktifkan mikrofon",
      microphonePrivacy: "Audio hanya dianalisis pada peranti ini dan tidak akan dirakam.",
      microphoneCalibrating: "Mendengar keadaan sekeliling…", blowInstruction: "Sila tiup lilin berhampiran mikrofon anda.",
      microphoneError: "Akses mikrofon tidak tersedia. Anda masih boleh meneruskan.", tapToBlow: "Sentuh di sini untuk meniup lilin",
      invitationKicker: "DUA TIKET · SATU MALAM ISTIMEWA", preparedFor: "Disediakan khas untuk",
      movieLabel: "Filem", dateLabel: "Tarikh", timeLabel: "Masa", locationLabel: "Lokasi", dressCodeLabel: "Pakaian",
      openMap: "Buka dalam Peta", addCalendar: "Tambah ke Kalendar", replyWhatsapp: "Balas melalui WhatsApp",
      voiceIntro: "Ada sesuatu yang saya mahu awak dengar.", playVoice: "Mainkan mesej saya", pauseVoice: "Jeda mesej saya",
      voiceUnavailable: "Mesej peribadi tidak dapat dimainkan. Muat naik fail MP3 suara yang ditetapkan ke root repositori.", previewReturn: "← Kembali ke menu pratonton"
    },
    zh: {
      privateFor: `为 ${recipient} 特别准备`, lockTitle: "这份惊喜，只属于一个特别的人。",
      lockBody: "输入对你们两人有意义的四个数字。", hintLabel: "提示：", hintText: "我们的故事开始的那一天",
      unlock: "打开这份惊喜", wrong: "差一点。想想那个只属于我们的日子。",
      heroKicker: "一个由我们组成的小小瞬间", heroTitle: "我为你准备了一份小惊喜。",
      heroBody: "深呼吸，打开声音，让这一刻慢慢展开。", enter: "进入我们的故事",
      selectKicker: "选择一个瞬间", selectTitle: "选择你的惊喜形状。",
      forLove: "为爱", forBirthday: "生日惊喜", forDate: "约会邀请",
      ready: "已准备", comingNext: "即将推出", chooseHint: "选择一份惊喜继续。",
      releaseKicker: "我们的回忆，紧紧相连", releaseTitle: "每一道光，都藏着我们的片段。",
      releaseBody: "轻轻移动。准备好后，让回忆绽放。", release: "释放回忆",
      memoryKicker: "六个小小瞬间", memoryTitle: "所有碎片，最终都带我回到你身边。",
      memoryHint: "点击一段回忆，让它靠近你。", finaleButton: "揭晓最后的信息 →",
      finaleKicker: "最后的惊喜", finaleTitle: "同一片天空，不同的日子，永远是我们。",
      finaleBody: "谢谢你，让平凡的时刻变得难以忘怀。", replay: "重温这一刻",
      dateAnswer: "好呀 — 我们约会吧 ♥", cinemaKicker: "今晚放映",
      cinemaOpening: "特别放映即将开始。",
      cinemaStatus: "一部由我们的片段组成的小电影。", cinemaContinue: "揭晓邀请",
      musicUnavailable: "无法播放背景音乐。请确认设定的文件存在，并且确实以 MP3 格式编码。",
      birthdayMoment: "一个生日愿望", birthdayMakeWish: `许个愿吧，${recipient}。`,
      birthdayBlown: "你的愿望正在变成一段回忆。", enableMicrophone: "启用麦克风",
      microphonePrivacy: "声音只会在此设备上分析，不会被录音或上传。",
      microphoneCalibrating: "正在聆听周围环境…", blowInstruction: "请靠近麦克风吹灭蜡烛。",
      microphoneError: "无法使用麦克风，你仍然可以继续。", tapToBlow: "点击这里吹灭蜡烛",
      invitationKicker: "双人入场 · 一个特别的夜晚", preparedFor: "特别为你准备",
      movieLabel: "电影", dateLabel: "日期", timeLabel: "时间", locationLabel: "地点", dressCodeLabel: "着装",
      openMap: "打开地图", addCalendar: "加入日历", replyWhatsapp: "通过 WhatsApp 回复",
      voiceIntro: "有一段话，我想让你亲耳听见。", playVoice: "播放我的留言", pauseVoice: "暂停留言",
      voiceUnavailable: "无法播放语音留言。请把设定的语音 MP3 上传到仓库根目录。", previewReturn: "← 返回体验目录"
    }
  };

  const birthdayCopy = {
    en: {
      releaseKicker: "A WISH, MADE JUST FOR YOU", releaseTitle: `Make a wish, ${recipient}.`,
      releaseBody: "The candles are glowing. When you are ready, let the celebration begin.", release: "Light up the memories",
      memoryKicker: "FOUR BIRTHDAY MOMENTS", memoryTitle: "A few reasons today feels brighter.",
      memoryHint: "Tap a photo to bring the moment closer.", finaleKicker: `HAPPY BIRTHDAY, ${recipient.toUpperCase()}`,
      finaleTitle: "Another year of your joy is worth celebrating.",
      finaleBody: "May every day bring soft naps, favourite treats, and so many reasons to wag.",
      dialogCopy: "A little moment chosen especially for your birthday."
    },
    bm: {
      releaseKicker: "SATU HARAPAN, KHAS UNTUK AWAK", releaseTitle: `Buat satu harapan, ${recipient}.`,
      releaseBody: "Lilin sedang menyala. Apabila bersedia, mulakan sambutan ini.", release: "Nyalakan kenangan",
      memoryKicker: "EMPAT DETIK HARI JADI", memoryTitle: "Beberapa sebab hari ini terasa lebih cerah.",
      memoryHint: "Sentuh foto untuk melihatnya dengan lebih dekat.", finaleKicker: `SELAMAT HARI JADI, ${recipient.toUpperCase()}`,
      finaleTitle: "Setahun lagi bersama awak patut diraikan.",
      finaleBody: "Semoga tahun ini membawa hari yang indah, impian yang berani, dan banyak sebab untuk tersenyum.",
      dialogCopy: "Satu detik kecil yang dipilih khas untuk hari jadi awak."
    },
    zh: {
      releaseKicker: "一个专属于你的愿望", releaseTitle: `许个愿吧，${recipient}。`,
      releaseBody: "蜡烛已经点亮。准备好后，让庆祝开始吧。", release: "点亮回忆",
      memoryKicker: "四个生日瞬间", memoryTitle: "因为这些瞬间，今天更加明亮。",
      memoryHint: "点击照片，让回忆靠近一点。", finaleKicker: `生日快乐，${recipient}`,
      finaleTitle: "新一岁的你，值得好好庆祝。",
      finaleBody: "愿新的一岁有温柔的日子、勇敢的梦想，还有许多微笑的理由。",
      dialogCopy: "这是为你的生日特别挑选的小小瞬间。"
    }
  };

  const dateCopy = {
    en: {
      releaseKicker: "A QUIET PLACE TO REMEMBER", releaseTitle: "A love like this is never really gone.",
      releaseBody: "A final letter is waiting inside. Open it when you are ready.", release: "Open the letter",
      memoryKicker: "SIX MOMENTS WE HOLD CLOSE", memoryTitle: "Good moments stay with us.",
      memoryHint: "Tap a photo to revisit the moment.", finaleKicker: `A LITTLE QUESTION FOR ${recipient.toUpperCase()}`,
      finaleTitle: "Will you go on a date with me?",
      finaleBody: "Just you, me, and a little time together. The rest can be a surprise.",
      dialogCopy: "One more reason I would love to spend the day with you.",
      confirmation: "It’s a date. I can’t wait ♥"
    },
    bm: {
      releaseKicker: "SATU TIKET, DUA TEMPAT DUDUK", releaseTitle: "Ada satu tempat yang saya mahu berada.",
      releaseBody: "Satu jemputan kecil sedang menunggu. Sentuh tiket apabila awak bersedia.", release: "Buka jemputan",
      memoryKicker: "ENAM SEBAB UNTUK BERKATA YA", memoryTitle: "Detik indah terasa lebih baik bersama awak.",
      memoryHint: "Sentuh foto untuk mengingati detik itu.", finaleKicker: `SATU SOALAN KECIL UNTUK ${recipient.toUpperCase()}`,
      finaleTitle: "Awak mahu keluar temu janji dengan saya?",
      finaleBody: "Hanya awak, saya, dan sedikit masa bersama. Selebihnya biarlah menjadi kejutan.",
      dialogCopy: "Satu lagi sebab saya mahu meluangkan hari bersama awak.",
      confirmation: "Kita akan keluar bersama. Tak sabar rasanya ♥"
    },
    zh: {
      releaseKicker: "一张票，两个座位", releaseTitle: "有一个地方，我想和你一起去。",
      releaseBody: "一份小邀请藏在里面。准备好后，点击电影票吧。", release: "打开邀请",
      memoryKicker: "六个答应我的理由", memoryTitle: "因为有你，美好时刻变得更加特别。",
      memoryHint: "点击照片，再看一眼那段时光。", finaleKicker: `想问 ${recipient} 的一个小问题`,
      finaleTitle: "你愿意和我约会吗？",
      finaleBody: "只有你、我，还有一段属于我们的时间。其他的，就留作惊喜吧。",
      dialogCopy: "这是我想和你一起度过这一天的另一个理由。",
      confirmation: "约定好了，我已经开始期待了 ♥"
    }
  };

  const loveMemories = CONFIG.memories.love;
  const birthdayMemories = CONFIG.memories.birthday;
  const dateMemories = CONFIG.memories.date;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.querySelector("#particle-canvas");
  const ctx = canvas.getContext("2d", { alpha: true });
  let width = 0, height = 0, dpr = 1;
  let language = ["en", "bm", "zh"].includes(CONFIG.defaultLanguage) ? CONFIG.defaultLanguage : "en";
  let selectedJourney = routedJourney || (["love", "birthday", "date"].includes(CONFIG.defaultJourney) ? CONFIG.defaultJourney : "love");
  let pointerX = 0, pointerY = 0, heartOpacity = 0.24;
  let particleTransition = null;
  let birthdayAudioContext = null, birthdayStream = null, birthdayDetectionFrame = null;
  let birthdayWishReleased = false;

  const particleCount = innerWidth < 720 ? 1100 : 2300;
  const particles = [];
  const stars = [];

  function createParticle(index) {
    const t = Math.random() * Math.PI * 2;
    const layer = 0.78 + Math.random() * 0.25;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const heart = {
      x: hx * 0.06 * layer,
      y: -hy * 0.06 * layer,
      z: (Math.random() - 0.5) * 0.9
    };
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 3.2 + Math.random() * 8.5;
    const burst = {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi)
    };

    let cake;
    const part = Math.random();
    if (part < 0.72) {
      const lowerTier = Math.random() < 0.6;
      const cakeRadius = lowerTier ? 0.82 : 0.56;
      const centerY = lowerTier ? 0.36 : -0.17;
      const cakeHeight = lowerTier ? 0.55 : 0.48;
      const angle = Math.random() * Math.PI * 2;
      const onTop = Math.random() < 0.22;
      const radial = onTop ? Math.sqrt(Math.random()) * cakeRadius : cakeRadius * (0.92 + Math.random() * 0.08);
      cake = {
        x: Math.cos(angle) * radial,
        y: onTop ? centerY - cakeHeight / 2 : centerY + (Math.random() - 0.5) * cakeHeight,
        z: Math.sin(angle) * radial * 0.72
      };
    } else if (part < 0.88) {
      cake = { x: (Math.random() - 0.5) * 0.09, y: -0.76 + Math.random() * 0.42, z: (Math.random() - 0.5) * 0.08 };
    } else {
      const flameAngle = Math.random() * Math.PI * 2;
      const flameRadius = Math.sqrt(Math.random());
      cake = {
        x: Math.cos(flameAngle) * 0.14 * flameRadius,
        y: -1.02 + Math.sin(flameAngle) * 0.24 * flameRadius,
        z: (Math.random() - 0.5) * 0.11
      };
    }

    const ticketX = (Math.random() - 0.5) * 1.85;
    const ticketY = (Math.random() - 0.5) * 1.02;
    const onPerforation = Math.random() < 0.13;
    const ticket = {
      x: onPerforation ? (Math.random() < 0.5 ? -0.67 : 0.67) + (Math.random() - 0.5) * 0.025 : ticketX,
      y: ticketY,
      z: (Math.random() - 0.5) * 0.13 + Math.sin(ticketX * 3.1) * 0.035
    };

    return {
      heart, cake, ticket, burst,
      current: { ...heart },
      start: { ...heart },
      color: index % 5 === 0 ? "198,154,99" : "169,79,85",
      size: 0.55 + Math.random() * 1.35,
      phase: Math.random() * Math.PI * 2
    };
  }

  for (let i = 0; i < particleCount; i++) particles.push(createParticle(i));
  for (let i = 0; i < 180; i++) {
    stars.push({ x: Math.random(), y: Math.random(), r: 0.25 + Math.random(), a: 0.08 + Math.random() * 0.34 });
  }

  function resizeCanvas() {
    width = innerWidth;
    height = innerHeight;
    dpr = Math.min(devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function easeInOut(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function moveParticles(target, duration) {
    particles.forEach(p => { p.start = { ...p.current }; });
    particleTransition = {
      target,
      startTime: performance.now(),
      duration: reducedMotion ? 1 : duration
    };
  }

  function updateParticleTransition(now) {
    if (!particleTransition) return;
    const raw = Math.min(1, (now - particleTransition.startTime) / particleTransition.duration);
    const amount = easeInOut(raw);
    particles.forEach(p => {
      const destination = p[particleTransition.target];
      p.current.x = p.start.x + (destination.x - p.start.x) * amount;
      p.current.y = p.start.y + (destination.y - p.start.y) * amount;
      p.current.z = p.start.z + (destination.z - p.start.z) * amount;
    });
    if (raw === 1) particleTransition = null;
  }

  function render(now) {
    updateParticleTransition(now);
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    stars.forEach((star, i) => {
      const pulse = 0.72 + Math.sin(now * 0.00065 + i) * 0.28;
      ctx.fillStyle = `rgba(198,154,99,${star.a * pulse})`;
      ctx.beginPath();
      ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      ctx.fill();
    });

    const baseScale = Math.min(width, height) * (width < 720 ? 0.28 : 0.32);
    const rotY = (reducedMotion ? 0 : pointerX * 0.48) + Math.sin(now * 0.00024) * 0.08;
    const rotX = (reducedMotion ? 0 : -pointerY * 0.3) + Math.cos(now * 0.00019) * 0.035;
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

    particles.forEach(p => {
      const x1 = p.current.x * cosY - p.current.z * sinY;
      const z1 = p.current.x * sinY + p.current.z * cosY;
      const y1 = p.current.y * cosX - z1 * sinX;
      const z2 = p.current.y * sinX + z1 * cosX;
      const perspective = Math.max(0.18, 1 / (1 + z2 * 0.11));
      const x = width / 2 + x1 * baseScale * perspective;
      const y = height / 2 + y1 * baseScale * perspective;
      if (x < -20 || x > width + 20 || y < -20 || y > height + 20) return;
      const shimmer = 0.72 + Math.sin(now * 0.0014 + p.phase) * 0.28;
      const radius = Math.max(0.45, p.size * perspective);
      ctx.fillStyle = `rgba(${p.color},${heartOpacity * shimmer})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
    requestAnimationFrame(render);
  }

  function showScreen(id) {
    const next = document.getElementById(id);
    const current = document.querySelector(".screen.active");
    if (!next || current === next) return;
    if (current) current.classList.remove("active");
    next.classList.add("active");
  }

  function setCopyValue(key, value) {
    const element = document.querySelector(`[data-copy="${key}"]`);
    if (element && value) element.textContent = value;
  }

  function populateClientDetails() {
    document.title = `A Private Surprise for ${recipient}`;
    document.querySelector("#cinema-sender").textContent = sender;
    document.querySelector("#cinema-recipient").textContent = recipient;
    document.querySelector("#signature-sender").textContent = sender;
    document.querySelector("#signature-recipient").textContent = recipient;

    const photos = Array.isArray(CONFIG.photos) ? CONFIG.photos : [];
    document.querySelectorAll(".memory-photo").forEach((image, index) => {
      if (photos[index]) image.src = photos[index];
      image.alt = `${recipient} memory ${index + 1}`;
    });
    document.querySelectorAll(".birthday-burst-photo img").forEach((image, index) => {
      if (photos[index]) image.src = photos[index];
    });
    document.querySelectorAll(".cinema-slide img").forEach((image, index) => {
      if (photos[index]) image.src = photos[index];
      image.alt = `${recipient} movie memory ${index + 1}`;
    });
  }

  let handwritingTimer = null;
  function handwrittenContent() {
    const journeyContent = CONFIG.handwrittenFinale[selectedJourney] || CONFIG.handwrittenFinale.love;
    const content = { ...(journeyContent[language] || journeyContent.en) };
    if (demoPersonalization?.finalMessage) content.message = String(demoPersonalization.finalMessage).slice(0, 100);
    return content;
  }

  function playHandwrittenFinale() {
    clearTimeout(handwritingTimer);
    const finale = document.querySelector("#handwritten-finale");
    const message = document.querySelector("#handwritten-message");
    const hiddenEnding = document.querySelector("#hidden-ending");
    const ornament = document.querySelector("#ending-ornament");
    const content = handwrittenContent();
    const text = fillClientTokens(content.message);
    message.replaceChildren();
    [...text].forEach((character, index) => {
      const stroke = document.createElement("span");
      stroke.className = "ink-stroke";
      stroke.style.setProperty("--stroke-index", index);
      stroke.textContent = character === " " ? "\u00a0" : character;
      message.appendChild(stroke);
    });
    hiddenEnding.textContent = "♡";
    hiddenEnding.dataset.message = fillClientTokens(content.hidden);
    hiddenEnding.setAttribute("aria-label", language === "zh" ? "点击查看最后一句话" : language === "bm" ? "Sentuh untuk mesej terakhir" : "Tap for one last message");
    ornament.textContent = selectedJourney === "birthday" ? "✦  ✧  ✦" : selectedJourney === "date" ? "⌁  ♡  ⌁" : "♡";
    finale.classList.remove("writing", "written");
    void finale.offsetWidth;
    finale.classList.add("writing");
    const duration = reducedMotion ? 20 : 850 + text.length * 105;
    handwritingTimer = setTimeout(() => finale.classList.add("written"), duration);
  }

  document.querySelector("#hidden-ending").addEventListener("click", event => {
    const button = event.currentTarget;
    button.textContent = button.dataset.message;
    button.classList.add("revealed");
  });

  function applyJourneyContent() {
    const source = selectedJourney === "birthday" ? birthdayCopy[language]
      : selectedJourney === "date" ? dateCopy[language]
      : copy[language];
    ["releaseKicker", "releaseTitle", "releaseBody", "release", "memoryKicker", "memoryTitle", "memoryHint", "finaleKicker", "finaleTitle", "finaleBody"]
      .forEach(key => setCopyValue(key, source[key]));
    document.querySelector("#dialog-copy").textContent = selectedJourney === "birthday"
      ? birthdayCopy[language].dialogCopy
      : selectedJourney === "date" ? dateCopy[language].dialogCopy
      : "A small moment, but a beautiful part of our story.";

    const memorySet = selectedJourney === "birthday" ? birthdayMemories
      : selectedJourney === "date" ? dateMemories
      : loveMemories;
    document.querySelectorAll(".memory-card").forEach((card, index) => {
      if (!memorySet[index]) return;
      card.dataset.title = memorySet[index].title;
      card.dataset.date = memorySet[index].date;
      card.querySelector(".memory-label").textContent = memorySet[index].title;
    });
  }

  function chooseJourney(journey) {
    selectedJourney = journey;
    document.body.dataset.journey = journey;
    document.querySelectorAll(".choice").forEach(choice => choice.classList.remove("active-choice"));
    const choiceId = journey === "birthday" ? "birthday" : journey === "date" ? "date" : "heart";
    document.querySelector(`#${choiceId}-choice`).classList.add("active-choice");
    applyJourneyContent();
    heartOpacity = 0.92;
    moveParticles(journey === "birthday" ? "cake" : journey === "date" ? "ticket" : "heart", 1100);
    showScreen("release-screen");
  }

  const inputs = [...document.querySelectorAll("#pin-inputs input")];
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(-1);
      if (input.value && inputs[index + 1]) inputs[index + 1].focus();
    });
    input.addEventListener("keydown", event => {
      if (event.key === "Backspace" && !input.value && inputs[index - 1]) inputs[index - 1].focus();
    });
    input.addEventListener("paste", event => {
      const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
      if (digits.length === 4) {
        event.preventDefault();
        digits.split("").forEach((digit, i) => { inputs[i].value = digit; });
        inputs[3].focus();
      }
    });
  });

  document.querySelector("#passcode-form").addEventListener("submit", async event => {
    event.preventDefault();
    const value = inputs.map(input => input.value).join("");
    const message = document.querySelector("#form-message");
    if (value.length !== 4 || value !== String(CONFIG.passcode)) {
      message.textContent = copy[language].wrong;
      document.querySelector("#pin-inputs").classList.remove("shake");
      void document.querySelector("#pin-inputs").offsetWidth;
      document.querySelector("#pin-inputs").classList.add("shake");
      return;
    }
    document.querySelector("#pin-inputs").classList.add("success");
    message.textContent = "";
    heartOpacity = 0.78;
    document.querySelector(".lock-panel").classList.add("unlocking");
    setTimeout(() => showScreen("hero-screen"), reducedMotion ? 10 : 650);
  });

  document.querySelector("#enter-button").addEventListener("click", () => {
    heartOpacity = 0.46;
    if (previewMode && routedJourney) chooseJourney(routedJourney);
    else showScreen("select-screen");
  });

  document.querySelector("#heart-choice").addEventListener("click", () => {
    chooseJourney("love");
  });

  document.querySelector("#birthday-choice").addEventListener("click", () => {
    chooseJourney("birthday");
  });

  document.querySelector("#date-choice").addEventListener("click", () => {
    chooseJourney("date");
  });

  function revealMemories() {
    showScreen("memories-screen");
    heartOpacity = 0.32;
    moveParticles("burst", 2300);
    document.querySelectorAll(".memory-card").forEach((card, index) => {
      card.style.setProperty("--card-delay", `${(reducedMotion ? 0 : 950 + index * 120)}ms`);
      card.classList.add("revealed");
    });
  }

  function stopBirthdayMicrophone() {
    if (birthdayDetectionFrame) cancelAnimationFrame(birthdayDetectionFrame);
    birthdayDetectionFrame = null;
    if (birthdayStream) birthdayStream.getTracks().forEach(track => track.stop());
    birthdayStream = null;
    if (birthdayAudioContext && birthdayAudioContext.state !== "closed") birthdayAudioContext.close();
    birthdayAudioContext = null;
  }

  function releaseBirthdayWish() {
    if (birthdayWishReleased) return;
    birthdayWishReleased = true;
    stopBirthdayMicrophone();
    document.body.classList.add("birthday-blown");
    document.querySelector("#birthday-transition-copy").textContent = copy[language].birthdayBlown;
    document.querySelector("#birthday-mic-button").hidden = true;
    document.querySelector("#birthday-privacy").hidden = true;
    document.querySelector("#birthday-fallback").hidden = true;
    heartOpacity = 0.58;
    setTimeout(() => moveParticles("burst", reducedMotion ? 1 : 1500), reducedMotion ? 20 : 850);
    setTimeout(() => {
      document.body.classList.remove("birthday-celebrating", "birthday-listening", "birthday-blown");
      revealMemories();
    }, reducedMotion ? 120 : 4300);
  }

  async function listenForBirthdayBlow() {
    const micButton = document.querySelector("#birthday-mic-button");
    const fallback = document.querySelector("#birthday-fallback");
    const instruction = document.querySelector("#birthday-transition-copy");
    micButton.disabled = true;
    instruction.textContent = copy[language].microphoneCalibrating;

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error("Microphone unsupported");
      birthdayStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        video: false
      });
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) throw new Error("Web Audio unsupported");
      birthdayAudioContext = new AudioContextClass();
      await birthdayAudioContext.resume();
      const source = birthdayAudioContext.createMediaStreamSource(birthdayStream);
      const analyser = birthdayAudioContext.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.35;
      source.connect(analyser);

      const timeData = new Float32Array(analyser.fftSize);
      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      const calibration = [];
      let calibrated = false;
      let threshold = 0.055;
      let blowFrames = 0;
      const calibrationStarted = performance.now();

      document.body.classList.add("birthday-listening");

      function measureSound() {
        analyser.getFloatTimeDomainData(timeData);
        analyser.getByteFrequencyData(frequencyData);
        let sumSquares = 0;
        for (const sample of timeData) sumSquares += sample * sample;
        const rms = Math.sqrt(sumSquares / timeData.length);

        if (!calibrated) {
          calibration.push(rms);
          if (performance.now() - calibrationStarted >= (reducedMotion ? 100 : 900)) {
            const noiseFloor = calibration.reduce((sum, value) => sum + value, 0) / Math.max(1, calibration.length);
            threshold = Math.max(0.045, noiseFloor * 3.2);
            calibrated = true;
            instruction.textContent = copy[language].blowInstruction;
          }
          birthdayDetectionFrame = requestAnimationFrame(measureSound);
          return;
        }

        const binHz = birthdayAudioContext.sampleRate / analyser.fftSize;
        const lowStart = Math.max(1, Math.floor(120 / binHz));
        const lowEnd = Math.min(frequencyData.length, Math.ceil(750 / binHz));
        const highStart = Math.max(1, Math.floor(900 / binHz));
        const highEnd = Math.min(frequencyData.length, Math.ceil(6000 / binHz));
        let lowTotal = 0, highTotal = 0;
        for (let i = lowStart; i < lowEnd; i++) lowTotal += frequencyData[i];
        for (let i = highStart; i < highEnd; i++) highTotal += frequencyData[i];
        const lowAverage = lowTotal / Math.max(1, lowEnd - lowStart);
        const highAverage = highTotal / Math.max(1, highEnd - highStart);
        const soundsLikeBreath = rms > threshold && highAverage > Math.max(13, lowAverage * 0.58);
        blowFrames = soundsLikeBreath ? blowFrames + 1 : Math.max(0, blowFrames - 1);

        if (blowFrames >= 5) {
          releaseBirthdayWish();
          return;
        }
        birthdayDetectionFrame = requestAnimationFrame(measureSound);
      }

      measureSound();
    } catch (error) {
      stopBirthdayMicrophone();
      micButton.hidden = true;
      instruction.textContent = copy[language].microphoneError;
      fallback.hidden = false;
    }
  }

  document.querySelector("#birthday-mic-button").addEventListener("click", listenForBirthdayBlow);
  document.querySelector("#birthday-fallback").addEventListener("click", releaseBirthdayWish);

  document.querySelector("#release-button").addEventListener("click", () => {
    if (selectedJourney === "date") {
      showScreen("cinema-screen");
      heartOpacity = 0.12;
      moveParticles("burst", 1700);
      document.body.classList.add("cinema-mode");
      requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("cinema-playing")));
      setTimeout(() => document.body.classList.add("cinema-ready"), reducedMotion ? 50 : 7600);
      return;
    }
    if (selectedJourney === "birthday") {
      showScreen("birthday-transition-screen");
      heartOpacity = 0.98;
      moveParticles("cake", reducedMotion ? 1 : 800);
      document.body.classList.add("birthday-celebrating");
      document.querySelector("#birthday-transition-copy").textContent = copy[language].birthdayMakeWish;
      return;
    }
    revealMemories();
  });

  const dialog = document.querySelector("#memory-dialog");
  document.querySelectorAll(".memory-card").forEach(card => {
    card.addEventListener("click", () => {
      const artClass = [...card.querySelector(".memory-art").classList]
        .find(className => /^memory-art-\d+$/.test(className));
      document.querySelector("#dialog-art").className = `dialog-art ${artClass || ""}`;
      document.querySelector("#dialog-title").textContent = card.dataset.title;
      document.querySelector("#dialog-date").textContent = card.dataset.date;
      const sourcePhoto = card.querySelector(".memory-photo");
      const dialogPhoto = document.querySelector("#dialog-photo");
      if (sourcePhoto && !sourcePhoto.hidden) {
        dialogPhoto.hidden = false;
        dialogPhoto.src = sourcePhoto.getAttribute("src");
        dialogPhoto.onerror = () => { dialogPhoto.hidden = true; };
      } else {
        dialogPhoto.hidden = true;
        dialogPhoto.removeAttribute("src");
      }
      dialog.showModal();
    });
  });
  document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

  document.querySelector("#finale-button").addEventListener("click", () => {
    showScreen("finale-screen");
    heartOpacity = 0.88;
    moveParticles(selectedJourney === "birthday" ? "cake" : selectedJourney === "date" ? "ticket" : "heart", 2100);
    playHandwrittenFinale();
  });

  document.querySelector("#cinema-continue").addEventListener("click", () => {
    showScreen("finale-screen");
    document.body.classList.remove("cinema-mode", "cinema-playing", "cinema-ready");
    heartOpacity = 0.88;
    moveParticles("ticket", 2100);
    playHandwrittenFinale();
  });

  function populateDateInvitation() {
    const invitation = CONFIG.dateInvitation;
    document.querySelector("#date-details-title").textContent = invitation.title;
    document.querySelector("#ticket-recipient").textContent = recipient;
    document.querySelector("#ticket-number").textContent = invitation.ticketNumber;
    document.querySelector("#invitation-movie").textContent = invitation.movie;
    document.querySelector("#invitation-date").textContent = invitation.date;
    document.querySelector("#invitation-time").textContent = invitation.time;
    document.querySelector("#invitation-location").textContent = invitation.location;
    document.querySelector("#invitation-dress-code").textContent = invitation.dressCode;

    const mapButton = document.querySelector("#map-button");
    mapButton.hidden = !invitation.mapUrl;
    if (invitation.mapUrl) mapButton.href = invitation.mapUrl;

    const calendarButton = document.querySelector("#calendar-button");
    calendarButton.hidden = !(invitation.calendarStart && invitation.calendarEnd);

    const phone = String(invitation.whatsappNumber || "").replace(/\D/g, "");
    const whatsappBase = phone ? `https://wa.me/${phone}` : "https://wa.me/";
    document.querySelector("#whatsapp-button").href = `${whatsappBase}?text=${encodeURIComponent(invitation.whatsappMessage)}`;
  }

  function escapeCalendarText(value) {
    return String(value || "").replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
  }

  function calendarDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }

  document.querySelector("#calendar-button").addEventListener("click", () => {
    const invitation = CONFIG.dateInvitation;
    const start = calendarDate(invitation.calendarStart);
    const end = calendarDate(invitation.calendarEnd);
    if (!start || !end) return;
    const calendarFile = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Surprise Website//Date Invitation//EN",
      "BEGIN:VEVENT", `UID:${Date.now()}@surprise-website`, `DTSTAMP:${calendarDate(new Date().toISOString())}`,
      `DTSTART:${start}`, `DTEND:${end}`, `SUMMARY:${escapeCalendarText(invitation.title)}`,
      `LOCATION:${escapeCalendarText(invitation.location)}`,
      `DESCRIPTION:${escapeCalendarText(`${invitation.movie} · ${invitation.dressCode}`)}`,
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([calendarFile], { type: "text/calendar;charset=utf-8" }));
    const download = document.createElement("a");
    download.href = url;
    download.download = "our-movie-date.ics";
    document.body.appendChild(download);
    download.click();
    download.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  document.querySelector("#date-response").addEventListener("click", () => {
    document.querySelector("#date-confirmation").textContent = dateCopy[language].confirmation;
    document.querySelector("#date-response").classList.add("accepted");
    setTimeout(() => {
      showScreen("date-details-screen");
      heartOpacity = 0.48;
      moveParticles("ticket", reducedMotion ? 1 : 1500);
    }, reducedMotion ? 60 : 900);
  });

  document.querySelector("#replay-button").addEventListener("click", () => location.reload());
  document.querySelector("#ticket-replay-button").addEventListener("click", () => location.reload());
  populateDateInvitation();

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language === "zh" ? "zh-MY" : language;
    document.querySelectorAll(".language").forEach(item => item.classList.toggle("active", item.dataset.lang === language));
    document.querySelectorAll("[data-copy]").forEach(element => {
      const key = element.dataset.copy;
      if (copy[language][key]) element.textContent = copy[language][key];
    });
    applyJourneyContent();
    updateVoiceButton(!personalVoice.paused);
    if (document.querySelector("#finale-screen").classList.contains("active")) playHandwrittenFinale();
  }
  document.querySelectorAll(".language").forEach(button => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));

  const sound = document.querySelector("#sound-toggle");
  const soundtrack = document.querySelector("#background-music");
  const personalVoice = document.querySelector("#personal-voice");
  const voiceButton = document.querySelector("#voice-message-button");
  const voiceLabel = document.querySelector("#voice-button-label");
  const voiceIcon = document.querySelector("#voice-play-icon");
  const voiceTime = document.querySelector("#voice-time");
  const voiceProgress = document.querySelector("#voice-progress");
  const soundStatus = document.querySelector("#sound-status");
  let soundFadeTimer = null;
  let soundStatusTimer = null;
  let resumeMusicAfterVoice = false;

  soundtrack.src = CONFIG.audio.music;

  const musicCredit = document.querySelector("#music-credit");
  const credit = CONFIG.audio.musicCredit;
  if (credit.title && credit.creator) {
    musicCredit.textContent = `Music: ${credit.title} — ${credit.creator}${credit.license ? ` · ${credit.license}` : ""}`;
    if (credit.sourceUrl) musicCredit.href = credit.sourceUrl;
    else musicCredit.removeAttribute("href");
    musicCredit.hidden = false;
  }

  function showSoundStatus(message) {
    clearTimeout(soundStatusTimer);
    soundStatus.textContent = message;
    soundStatus.classList.add("visible");
    soundStatusTimer = setTimeout(() => soundStatus.classList.remove("visible"), 4200);
  }

  function fadeSound(target, onComplete) {
    clearInterval(soundFadeTimer);
    const start = soundtrack.volume;
    const steps = reducedMotion ? 1 : 24;
    let step = 0;
    soundFadeTimer = setInterval(() => {
      step += 1;
      soundtrack.volume = Math.max(0, Math.min(1, start + (target - start) * (step / steps)));
      if (step >= steps) {
        clearInterval(soundFadeTimer);
        if (onComplete) onComplete();
      }
    }, reducedMotion ? 1 : 32);
  }

  sound.addEventListener("click", async () => {
    const isPlaying = sound.getAttribute("aria-pressed") === "true";
    if (isPlaying) {
      sound.setAttribute("aria-pressed", "false");
      sound.setAttribute("aria-label", "Play music");
      sound.textContent = "♪";
      fadeSound(0, () => soundtrack.pause());
      return;
    }

    try {
      soundtrack.volume = 0;
      await soundtrack.play();
      sound.setAttribute("aria-pressed", "true");
      sound.setAttribute("aria-label", "Pause music");
      sound.textContent = "♫";
      fadeSound(0.42);
    } catch (error) {
      sound.setAttribute("aria-pressed", "false");
      sound.textContent = "♪";
      showSoundStatus(copy[language].musicUnavailable);
    }
  });

  function formatAudioTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  }

  function updateVoiceButton(isPlaying) {
    voiceButton.setAttribute("aria-pressed", String(isPlaying));
    voiceIcon.textContent = isPlaying ? "Ⅱ" : "▶";
    voiceLabel.textContent = isPlaying ? copy[language].pauseVoice : copy[language].playVoice;
  }

  function restoreMusicAfterMessage() {
    if (resumeMusicAfterVoice && !soundtrack.paused) fadeSound(0.42);
    resumeMusicAfterVoice = false;
  }

  let demoVoiceUrl = null;
  function readRecordedVoice() {
    return new Promise(resolve => {
      if (!demoPersonalization?.hasVoice || !window.indexedDB) {
        resolve(null);
        return;
      }
      const request = indexedDB.open("surprise-diy-preview", 1);
      request.onerror = () => resolve(null);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains("media")) request.result.createObjectStore("media");
      };
      request.onsuccess = () => {
        const database = request.result;
        const transaction = database.transaction("media", "readonly");
        const getRequest = transaction.objectStore("media").get("voice-message");
        getRequest.onsuccess = () => {
          const blob = getRequest.result;
          database.close();
          if (!(blob instanceof Blob) || !blob.size) {
            resolve(null);
            return;
          }
          if (!demoVoiceUrl) demoVoiceUrl = URL.createObjectURL(blob);
          resolve(demoVoiceUrl);
        };
        getRequest.onerror = () => { database.close(); resolve(null); };
      };
    });
  }

  voiceButton.addEventListener("click", async () => {
    if (!personalVoice.paused) {
      personalVoice.pause();
      updateVoiceButton(false);
      restoreMusicAfterMessage();
      return;
    }

    const recordedSource = await readRecordedVoice();
    const source = recordedSource || CONFIG.audio.voiceMessages[selectedJourney] || CONFIG.audio.voiceMessages.love;
    if (!source) {
      showSoundStatus(copy[language].voiceUnavailable);
      return;
    }
    if (personalVoice.dataset.source !== source) {
      personalVoice.src = source;
      personalVoice.dataset.source = source;
      personalVoice.load();
    }

    resumeMusicAfterVoice = sound.getAttribute("aria-pressed") === "true" && !soundtrack.paused;
    if (resumeMusicAfterVoice) fadeSound(0.08);

    try {
      await personalVoice.play();
      updateVoiceButton(true);
    } catch (error) {
      updateVoiceButton(false);
      restoreMusicAfterMessage();
      showSoundStatus(copy[language].voiceUnavailable);
    }
  });

  personalVoice.addEventListener("timeupdate", () => {
    const duration = personalVoice.duration;
    const progress = Number.isFinite(duration) && duration > 0 ? personalVoice.currentTime / duration : 0;
    voiceProgress.style.setProperty("--voice-progress", String(Math.min(1, Math.max(0, progress))));
    voiceTime.textContent = Number.isFinite(duration)
      ? `${formatAudioTime(personalVoice.currentTime)} / ${formatAudioTime(duration)}`
      : formatAudioTime(personalVoice.currentTime);
  });

  personalVoice.addEventListener("ended", () => {
    updateVoiceButton(false);
    personalVoice.currentTime = 0;
    voiceProgress.style.setProperty("--voice-progress", "0");
    restoreMusicAfterMessage();
  });

  personalVoice.addEventListener("error", () => {
    updateVoiceButton(false);
    restoreMusicAfterMessage();
  });

  addEventListener("pointermove", event => {
    pointerX = event.clientX / innerWidth - 0.5;
    pointerY = event.clientY / innerHeight - 0.5;
  }, { passive: true });
  addEventListener("resize", resizeCanvas);

  populateClientDetails();
  document.body.dataset.journey = selectedJourney;
  applyLanguage(language);
  if (previewMode) {
    document.body.classList.add("preview-mode");
    document.querySelector("#preview-return").hidden = false;
    showScreen("hero-screen");
  }
  resizeCanvas();
  requestAnimationFrame(render);
  addEventListener("load", () => {
    setTimeout(() => document.querySelector("#loading-screen").classList.add("hidden"), 420);
    if (!previewMode) setTimeout(() => inputs[0].focus(), 800);
  });
})();
