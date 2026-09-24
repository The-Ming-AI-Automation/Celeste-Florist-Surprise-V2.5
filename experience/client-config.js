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
  defaultJourney: "love", // Welcome Home · Birthday · Memorial

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
      love: "voice-welcome-home.mp3",
      birthday: "voice-pet-birthday.mp3",
      date: "voice-memorial.mp3"
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
      { title: "The day you came home", date: "THE FIRST HELLO" },
      { title: "Your funniest habit", date: "A LITTLE JOY" },
      { title: "Our favourite walk", date: "OUT IN THE WORLD" },
      { title: "The way you look at us", date: "HOME" },
      { title: "One more cuddle", date: "THE LITTLE THINGS" },
      { title: "Still growing together", date: "TODAY" }
    ],
    birthday: [
      { title: "Your happiest tail-wag", date: "BIRTHDAY MEMORY 01" },
      { title: "Your favourite treat", date: "BIRTHDAY MEMORY 02" },
      { title: "The little things you do", date: "BIRTHDAY MEMORY 03" },
      { title: "Today is yours", date: "BIRTHDAY MEMORY 04" }
    ],
    date: [
      { title: "The first hello", date: "A BEGINNING" },
      { title: "Your favourite place", date: "A SMALL WORLD" },
      { title: "The joy you gave us", date: "FOREVER HELD" },
      { title: "Your familiar footsteps", date: "STILL HERE" },
      { title: "A love that remains", date: "ALWAYS" },
      { title: "Until we meet again", date: "IN OUR HEARTS" }
    ]
  },

  // 6. HANDWRITTEN ENDINGS
  // {recipient} and {sender} are replaced automatically.
  handwrittenFinale: {
    love: {
      en: { message: "Welcome home, {recipient}.", hidden: "You already belong here." },
      bm: { message: "Saya sayang awak, {recipient}.", hidden: "Hari ini, esok, dan seterusnya." },
      zh: { message: "我爱你，{recipient}。", hidden: "一直都是。" }
    },
    birthday: {
      en: { message: "Happy Birthday, {recipient}.", hidden: "You make our home brighter." },
      bm: { message: "Selamat Hari Jadi, {recipient}.", hidden: "Semoga awak sentiasa disayangi." },
      zh: { message: "生日快乐，{recipient}。", hidden: "愿你一直被爱。" }
    },
    date: {
      en: { message: "Thank you for finding us, {recipient}.", hidden: "Forever in our hearts. ♡" },
      bm: { message: "Saya tak sabar untuk temu janji kita.", hidden: "Jumpa nanti, {recipient} ♡" },
      zh: { message: "很期待和你的约会。", hidden: "到时见，{recipient} ♡" }
    }
  },

  // 7. DATE INVITATION DETAILS
  dateInvitation: {
    title: "A Day To Remember",
    movie: "A little film of your life",
    date: "Forever held close",
    time: "Whenever we miss you",
    location: "Right here in our hearts",
    dressCode: "Bring every warm memory",
    ticketNumber: "PAW · 0901",
    mapUrl: "",
    calendarStart: "",
    calendarEnd: "",
    whatsappNumber: "",
    whatsappMessage: "Thank you for this beautiful memory. ♡"
  }
};
