(function () {
  "use strict";

  const config = window.SURPRISE_CONFIG;
  if (!config) throw new Error("Missing client-config.js");
  let language = ["en", "bm", "zh"].includes(config.defaultLanguage) ? config.defaultLanguage : "zh";

  function fillTokens(value) {
    return String(value || "")
      .replaceAll("{recipient}", config.recipientName)
      .replaceAll("{sender}", config.senderName);
  }

  function render() {
    const content = config.qrInvitation[language] || config.qrInvitation.en;
    document.documentElement.lang = language === "zh" ? "zh-MY" : language;
    document.querySelectorAll("[data-lang]").forEach(button => button.classList.toggle("active", button.dataset.lang === language));
    document.querySelector("#invitation-label").textContent = fillTokens(content.label);
    document.querySelector("#invitation-title").textContent = fillTokens(content.title);
    document.querySelector("#scan-instruction").textContent = fillTokens(content.instruction);
    document.querySelector("#microphone-note").textContent = fillTokens(content.microphoneNote);
    document.querySelector("#open-button-label").textContent = fillTokens(content.openButton);
    document.querySelector("#card-sender").textContent = config.senderName;
    document.title = `${config.recipientName} · Private Surprise Invitation`;

    const websiteUrl = String(config.websiteUrl || "").trim();
    const openButton = document.querySelector("#open-button");
    openButton.href = websiteUrl || "index.html";
    const qrTarget = websiteUrl || new URL("index.html", location.href).href;
    const qrParams = new URLSearchParams({
      text: qrTarget,
      size: "520",
      margin: "2",
      dark: "1b1820",
      light: "f5ede0",
      ecLevel: "Q",
      dotStyle: "rounded",
      finderStyle: "rounded",
      finderColor: "9e5361",
      format: "svg"
    });
    document.querySelector("#qr-image").src = `https://quickchart.io/qr?${qrParams}`;
  }

  document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => {
    language = button.dataset.lang;
    render();
  }));
  document.querySelector("#print-button").addEventListener("click", () => window.print());
  render();
})();
