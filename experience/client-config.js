/*
  ================================================================
  SURPRISE WEBSITE V2 — CLIENT EDITING SECTION
  ================================================================
  Edit this file for every client. You should not need to change
  index.html, script.js, style.css, qr.html, qr.js, or qr.css.

  Supported languages:
  - "en" = English
  - "bm" = Bahasa Melayu
  - "zh" = Malaysian Simplified Chinese

  Supported journeys:
  - "love"
  - "birthday"
  - "date"
*/

window.SURPRISE_CONFIG = {
  // 1. PEOPLE, ACCESS AND DEFAULT EXPERIENCE
  recipientName: "Someone Special",
  senderName: "Someone Who Cares",
  passcode: "0901",
  defaultLanguage: "zh",
  defaultJourney: "love",

  // Replace this after the GitHub Pages site is published.
  // The QR invitation card will open this address.
  websiteUrl: "https://the-ming-ai-automation.github.io/Celeste-Surprise-Demo/experience/",

  // 2. QR INVITATION CARD
  qrInvitation: {
    en: {
      label: "A PRIVATE INVITATION",
      title: "I prepared something for you, {recipient}.",
      instruction: "Scan when you’re somewhere quiet.",
      microphoneNote: "For the birthday experience, please allow microphone access.",
      openButton: "Open the surprise"
    },
    bm: {
      label: "JEMPUTAN PERIBADI",
      title: "Saya sediakan sesuatu untuk awak, {recipient}.",
      instruction: "Imbas apabila awak berada di tempat yang tenang.",
      microphoneNote: "Untuk pengalaman hari jadi, sila benarkan akses mikrofon.",
      openButton: "Buka kejutan"
    },
    zh: {
      label: "一份只属于你的邀请",
      title: "{recipient}，我为你准备了一份小惊喜。",
      instruction: "找个安静的地方，再扫描打开。",
      microphoneNote: "如果选择生日惊喜，请允许使用麦克风。",
      openButton: "打开惊喜"
    }
  },

  // 3. BACKGROUND MUSIC AND PERSONAL VOICE MESSAGES
  audio: {
    music: "music.mp3",
    voiceMessages: {
      love: "voice-love.mp3",
      birthday: "voice-birthday.mp3",
      date: "voice-date.mp3"
    },
    musicCredit: {
      title: "",
      creator: "",
      license: "",
      sourceUrl: ""
    }
  },

  // 4. PHOTOS
  // Upload these files beside index.html. You may rename them here.
  photos: [
    "photo-1.jpg",
    "photo-2.jpg",
    "photo-3.jpg",
    "photo-4.jpg",
    "photo-5.jpg",
    "photo-6.jpg"
  ],

  // 5. MEMORY CARD TITLES AND DATES
  memories: {
    love: [
      { title: "The first hello", date: "12.06.2022" },
      { title: "Our first movie", date: "28.08.2022" },
      { title: "That rainy trip", date: "14.01.2023" },
      { title: "A little note", date: "03.05.2023" },
      { title: "Same sky", date: "20.09.2024" },
      { title: "Today", date: "23.09.2026" }
    ],
    birthday: [
      { title: "Your brightest smile", date: "BIRTHDAY MEMORY 01" },
      { title: "A favourite day", date: "BIRTHDAY MEMORY 02" },
      { title: "The little things", date: "BIRTHDAY MEMORY 03" },
      { title: "Today is yours", date: "BIRTHDAY MEMORY 04" }
    ],
    date: [
      { title: "The smile I remember", date: "WHY I CHOSE YOU 01" },
      { title: "Our easiest laugh", date: "WHY I CHOSE YOU 02" },
      { title: "A favourite moment", date: "WHY I CHOSE YOU 03" },
      { title: "The view was better with you", date: "WHY I CHOSE YOU 04" },
      { title: "More days like this", date: "WHY I CHOSE YOU 05" },
      { title: "One more memory?", date: "YOUR INVITATION" }
    ]
  },

  // 6. HANDWRITTEN ENDINGS
  // {recipient} and {sender} are replaced automatically.
  handwrittenFinale: {
    love: {
      en: { message: "I love you, {recipient}.", hidden: "Always have. Always will." },
      bm: { message: "Saya sayang awak, {recipient}.", hidden: "Hari ini, esok, dan seterusnya." },
      zh: { message: "我爱你，{recipient}。", hidden: "一直都是。" }
    },
    birthday: {
      en: { message: "Happy Birthday, {recipient}.", hidden: "May you always feel loved." },
      bm: { message: "Selamat Hari Jadi, {recipient}.", hidden: "Semoga awak sentiasa disayangi." },
      zh: { message: "生日快乐，{recipient}。", hidden: "愿你一直被爱。" }
    },
    date: {
      en: { message: "I’m looking forward to our date.", hidden: "See you soon, {recipient} ♡" },
      bm: { message: "Saya tak sabar untuk temu janji kita.", hidden: "Jumpa nanti, {recipient} ♡" },
      zh: { message: "很期待和你的约会。", hidden: "到时见，{recipient} ♡" }
    }
  },

  // 7. DATE INVITATION DETAILS
  dateInvitation: {
    title: "Our Movie Date",
    movie: "A movie of your choice",
    date: "Our next free evening",
    time: "After sunset",
    location: "I’ll reveal it soon",
    dressCode: "Come as you are",
    ticketNumber: "M+C · 0901",
    mapUrl: "",
    calendarStart: "",
    calendarEnd: "",
    whatsappNumber: "",
    whatsappMessage: "It’s a date ♥ I said yes!"
  }
};
