/* =============================================
   EcoRevive AI — script.js (FINAL)
   - Backend /ai call (OpenRouter + YouTube)
   - Video embedded on page (plays inline)
   - Multi-language UI + AI response
   ============================================= */

// ══════════════════════════════════════════════
// 1. LANGUAGE DATA
// ══════════════════════════════════════════════
const LANG = {
  en: {
    flag:"🇬🇧", name:"English",
    badge:"AI-Powered Waste-to-Wealth Solutions",
    title1:"Transform", title2:"Waste", title3:"into", title4:"Wealth",
    subtitle:"Discover innovative ways to convert agricultural and industrial waste into valuable products using cutting-edge AI",
    placeholder:"Enter waste material (e.g., Rice husk, Coffee grounds, Tomato waste...)",
    askBtn:"Ask AI", loadingText:"AI is analyzing your waste material...",
    resultTitle:"AI Analysis Results", videoTitle:"Related Video",
    noVideo:"No related video found.",
    notifyEmpty:"Please enter a waste material first!",
    notifySuccess:"Analysis complete!", notifyError:"Something went wrong. Try again.",
    featuresTitle:"Why Choose EcoRevive AI?", examplesTitle:"Popular Waste Transformations",
    f1t:"AI-Powered Analysis",  f1d:"Advanced algorithms to identify the best transformation methods for your waste",
    f2t:"Maximize Value",       f2d:"Insights on the most profitable ways to convert waste into marketable products",
    f3t:"Eco-Friendly",         f3d:"Contribute to a sustainable future by reducing waste and carbon footprint",
    f4t:"Innovative Solutions", f4d:"Discover cutting-edge technologies and creative transformation methods",
    s1:"Materials Analyzed", s2:"Transformation Methods", s3:"Success Rate", s4:"AI Availability",
    footerTag:"Transforming waste into wealth with AI.",
    footerCopy:"© 2026 EcoRevive Transformation AI. All rights reserved.",
    langInstruction: ""
  },
  hi: {
    flag:"🇮🇳", name:"हिंदी",
    badge:"AI-संचालित कचरा-से-संपत्ति समाधान",
    title1:"बदलें", title2:"कचरे", title3:"को", title4:"संपत्ति में",
    subtitle:"कृषि और औद्योगिक कचरे को मूल्यवान उत्पादों में बदलने के नवीन तरीके खोजें",
    placeholder:"कचरा सामग्री दर्ज करें (जैसे: चावल की भूसी, टमाटर कचरा, प्लास्टिक...)",
    askBtn:"AI से पूछें", loadingText:"AI आपकी सामग्री का विश्लेषण कर रहा है...",
    resultTitle:"AI विश्लेषण परिणाम", videoTitle:"संबंधित वीडियो",
    noVideo:"कोई संबंधित वीडियो नहीं मिला।",
    notifyEmpty:"कृपया पहले सामग्री दर्ज करें!",
    notifySuccess:"विश्लेषण पूरा हुआ!", notifyError:"कुछ गलत हुआ। पुनः प्रयास करें।",
    featuresTitle:"EcoRevive AI क्यों चुनें?", examplesTitle:"लोकप्रिय कचरा परिवर्तन",
    f1t:"AI-संचालित विश्लेषण", f1d:"सर्वोत्तम परिवर्तन विधियों की पहचान के लिए उन्नत एल्गोरिदम",
    f2t:"मूल्य अधिकतम करें",   f2d:"कचरे को उत्पादों में बदलने के सबसे लाभदायक तरीकों पर जानकारी",
    f3t:"पर्यावरण अनुकूल",     f3d:"कचरा कम करके एक टिकाऊ भविष्य में योगदान दें",
    f4t:"नवीन समाधान",         f4d:"अत्याधुनिक तकनीकें और रचनात्मक परिवर्तन विधियां खोजें",
    s1:"सामग्री विश्लेषण", s2:"परिवर्तन विधियां", s3:"सफलता दर", s4:"AI उपलब्धता",
    footerTag:"AI से कचरे को संपत्ति में बदलना।",
    footerCopy:"© 2026 EcoRevive Transformation AI. सर्वाधिकार सुरक्षित।",
    langInstruction:"IMPORTANT: You must respond entirely in Hindi language only."
  },
  mr: {
    flag:"🇮🇳", name:"मराठी",
    badge:"AI-चालित कचरा-ते-संपत्ती उपाय",
    title1:"बदला", title2:"कचरा", title3:"ला", title4:"संपत्तीत",
    subtitle:"कृषी व औद्योगिक कचरा मौल्यवान उत्पादनांमध्ये रूपांतरित करण्याचे नाविन्यपूर्ण मार्ग शोधा",
    placeholder:"कचरा सामग्री टाका (उदा: तांदळाची भुसी, टोमॅटो कचरा, प्लास्टिक...)",
    askBtn:"AI ला विचारा", loadingText:"AI तुमच्या सामग्रीचे विश्लेषण करत आहे...",
    resultTitle:"AI विश्लेषण निकाल", videoTitle:"संबंधित व्हिडिओ",
    noVideo:"कोणताही संबंधित व्हिडिओ आढळला नाही.",
    notifyEmpty:"कृपया आधी सामग्री प्रविष्ट करा!",
    notifySuccess:"विश्लेषण पूर्ण झाले!", notifyError:"काहीतरी चूक झाली. पुन्हा प्रयत्न करा.",
    featuresTitle:"EcoRevive AI का निवडा?", examplesTitle:"लोकप्रिय कचरा रूपांतरणे",
    f1t:"AI-चालित विश्लेषण",   f1d:"सर्वोत्तम परिवर्तन पद्धती ओळखण्यासाठी प्रगत अल्गोरिदम",
    f2t:"मूल्य वाढवा",          f2d:"कचरा उत्पादनांमध्ये बदलण्याच्या सर्वात फायदेशीर मार्गांवर अंतर्दृष्टी",
    f3t:"पर्यावरणपूरक",         f3d:"कचरा कमी करून शाश्वत भविष्यात योगदान द्या",
    f4t:"नाविन्यपूर्ण उपाय",   f4d:"अत्याधुनिक तंत्रज्ञान आणि सर्जनशील पद्धती शोधा",
    s1:"सामग्री विश्लेषण", s2:"परिवर्तन पद्धती", s3:"यश दर", s4:"AI उपलब्धता",
    footerTag:"AI सह कचऱ्याचे संपत्तीत रूपांतर.",
    footerCopy:"© 2026 EcoRevive Transformation AI. सर्व हक्क राखीव.",
    langInstruction:"IMPORTANT: You must respond entirely in Marathi language only."
  },
  ta: {
    flag:"🇮🇳", name:"தமிழ்",
    badge:"AI-இயக்கப்படும் கழிவு-செல்வம் தீர்வுகள்",
    title1:"மாற்றுங்கள்", title2:"கழிவுகளை", title3:"செல்வமாக", title4:"",
    subtitle:"விவசாய மற்றும் தொழில்துறை கழிவுகளை மதிப்புமிக்க தயாரிப்புகளாக மாற்றுவதற்கான புதுமையான வழிகளை கண்டறியுங்கள்",
    placeholder:"கழிவு பொருளை உள்ளிடவும் (எ.கா: அரிசி தவிடு, தக்காளி கழிவு, பிளாஸ்டிக்...)",
    askBtn:"AI-யிடம் கேளுங்கள்", loadingText:"AI பகுப்பாய்வு செய்கிறது...",
    resultTitle:"AI பகுப்பாய்வு முடிவுகள்", videoTitle:"தொடர்புடைய வீடியோ",
    noVideo:"தொடர்புடைய வீடியோ இல்லை.",
    notifyEmpty:"முதலில் பொருளை உள்ளிடவும்!",
    notifySuccess:"பகுப்பாய்வு முடிந்தது!", notifyError:"தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.",
    featuresTitle:"EcoRevive AI ஏன் தேர்வு செய்ய வேண்டும்?", examplesTitle:"பிரபலமான கழிவு மாற்றங்கள்",
    f1t:"AI பகுப்பாய்வு",         f1d:"சிறந்த மாற்றும் முறைகளை கண்டறிய மேம்பட்ட அல்காரிதம்கள்",
    f2t:"மதிப்பை அதிகரிக்கவும்",  f2d:"கழிவுகளை தயாரிப்புகளாக மாற்றுவதற்கான லாபகரமான வழிகள்",
    f3t:"சுற்றுச்சூழல் நட்பு",    f3d:"கழிவுகளை குறைத்து நிலையான எதிர்காலத்திற்கு பங்களிக்கவும்",
    f4t:"புதுமையான தீர்வுகள்",    f4d:"அதிநவீன தொழில்நுட்பங்கள் மற்றும் ஆக்கப்பூர்வ முறைகளை கண்டறியவும்",
    s1:"பகுப்பாய்வு பொருட்கள்", s2:"மாற்றும் முறைகள்", s3:"வெற்றி விகிதம்", s4:"AI கிடைக்கும் நேரம்",
    footerTag:"AI மூலம் கழிவுகளை செல்வமாக மாற்றுகிறோம்.",
    footerCopy:"© 2026 EcoRevive Transformation AI. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    langInstruction:"IMPORTANT: You must respond entirely in Tamil language only."
  },
  te: {
    flag:"🇮🇳", name:"తెలుగు",
    badge:"AI-ఆధారిత వ్యర్థ-సంపద పరిష్కారాలు",
    title1:"వ్యర్థాలను", title2:"సంపదగా", title3:"మార్చండి", title4:"",
    subtitle:"వ్యవసాయ మరియు పారిశ్రామిక వ్యర్థాలను విలువైన ఉత్పత్తులుగా మార్చడానికి వినూత్న మార్గాలను కనుగొనండి",
    placeholder:"వ్యర్థ పదార్థాన్ని నమోదు చేయండి (ఉదా: వరి పొట్టు, టమాటా వ్యర్థాలు, ప్లాస్టిక్...)",
    askBtn:"AI అడగండి", loadingText:"AI విశ్లేషిస్తోంది...",
    resultTitle:"AI విశ్లేషణ ఫలితాలు", videoTitle:"సంబంధిత వీడియో",
    noVideo:"సంబంధిత వీడియో కనుగొనబడలేదు.",
    notifyEmpty:"దయచేసి పదార్థాన్ని నమోదు చేయండి!",
    notifySuccess:"విశ్లేషణ పూర్తైంది!", notifyError:"ఏదో తప్పు జరిగింది. మళ్ళీ ప్రయత్నించండి.",
    featuresTitle:"EcoRevive AI ఎందుకు ఎంచుకోవాలి?", examplesTitle:"ప్రసిద్ధ వ్యర్థ పరివర్తనలు",
    f1t:"AI విశ్లేషణ",            f1d:"ఉత్తమ పరివర్తన పద్ధతులను గుర్తించడానికి అధునాతన అల్గోరిథమ్‌లు",
    f2t:"విలువను పెంచుకోండి",    f2d:"వ్యర్థాలను ఉత్పత్తులుగా మార్చే లాభదాయకమైన మార్గాలపై అంతర్దృష్టి",
    f3t:"పర్యావరణ అనుకూలం",      f3d:"వ్యర్థాలను తగ్గించడం ద్వారా స్థిరమైన భవిష్యత్తుకు దోహదపడండి",
    f4t:"వినూత్న పరిష్కారాలు",   f4d:"అత్యాధునిక సాంకేతికతలు మరియు సృజనాత్మక పద్ధతులను కనుగొనండి",
    s1:"విశ్లేషించిన పదార్థాలు", s2:"పరివర్తన పద్ధతులు", s3:"విజయ రేటు", s4:"AI లభ్యత",
    footerTag:"AI తో వ్యర్థాలను సంపదగా మారుస్తున్నాం.",
    footerCopy:"© 2026 EcoRevive Transformation AI. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
    langInstruction:"IMPORTANT: You must respond entirely in Telugu language only."
  },
  bn: {
    flag:"🇧🇩", name:"বাংলা",
    badge:"AI-চালিত বর্জ্য-থেকে-সম্পদ সমাধান",
    title1:"রূপান্তরিত করুন", title2:"বর্জ্যকে", title3:"সম্পদে", title4:"",
    subtitle:"কৃষি ও শিল্প বর্জ্যকে মূল্যবান পণ্যে রূপান্তরিত করার উদ্ভাবনী উপায় আবিষ্কার করুন",
    placeholder:"বর্জ্য উপাদান লিখুন (যেমন: ধানের তুষ, টমেটো বর্জ্য, প্লাস্টিক বর্জ্য...)",
    askBtn:"AI-কে জিজ্ঞাসা করুন", loadingText:"AI বিশ্লেষণ করছে...",
    resultTitle:"AI বিশ্লেষণ ফলাফল", videoTitle:"সম্পর্কিত ভিডিও",
    noVideo:"কোনো সম্পর্কিত ভিডিও পাওয়া যায়নি।",
    notifyEmpty:"অনুগ্রহ করে প্রথমে উপাদান লিখুন!",
    notifySuccess:"বিশ্লেষণ সম্পন্ন!", notifyError:"কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",
    featuresTitle:"EcoRevive AI কেন বেছে নেবেন?", examplesTitle:"জনপ্রিয় বর্জ্য রূপান্তর",
    f1t:"AI বিশ্লেষণ",            f1d:"সেরা রূপান্তর পদ্ধতি চিহ্নিত করতে উন্নত অ্যালগরিদম",
    f2t:"মূল্য সর্বাধিক করুন",   f2d:"বর্জ্যকে পণ্যে রূপান্তরের সবচেয়ে লাভজনক উপায়গুলিতে অন্তর্দৃষ্টি",
    f3t:"পরিবেশবান্ধব",           f3d:"বর্জ্য কমিয়ে একটি টেকসই ভবিষ্যতে অবদান রাখুন",
    f4t:"উদ্ভাবনী সমাধান",        f4d:"অত্যাধুনিক প্রযুক্তি এবং সৃজনশীল পদ্ধতি আবিষ্কার করুন",
    s1:"বিশ্লেষিত উপাদান", s2:"রূপান্তর পদ্ধতি", s3:"সাফল্যের হার", s4:"AI প্রাপ্যতা",
    footerTag:"AI দিয়ে বর্জ্যকে সম্পদে রূপান্তরিত করা।",
    footerCopy:"© 2026 EcoRevive Transformation AI. সমস্ত অধিকার সংরক্ষিত।",
    langInstruction:"IMPORTANT: You must respond entirely in Bengali language only."
  }
};

// ══════════════════════════════════════════════
// 2. STATE
// ══════════════════════════════════════════════
let currentLang = "en";

// ══════════════════════════════════════════════
// 3. INIT
// ══════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  injectAllStyles();
  injectLanguageSwitcher();
  applyLanguage("en");
  attachEvents();
});

// ══════════════════════════════════════════════
// 4. LANGUAGE SWITCHER
// ══════════════════════════════════════════════
function injectLanguageSwitcher() {
  const nav = document.querySelector(".nav-container");
  if (!nav) return;
  const wrap = document.createElement("div");
  wrap.className = "lang-switcher";
  wrap.innerHTML = `
    <div class="lang-btn" id="langToggle">
      <i class="fas fa-globe"></i>
      <span id="langLabel">🇬🇧 EN</span>
      <i class="fas fa-chevron-down lang-arrow"></i>
    </div>
    <div class="lang-dropdown hidden" id="langDropdown">
      ${Object.entries(LANG).map(([code, l]) => `
        <div class="lang-option${code==="en"?" active":""}" data-lang="${code}">
          <span class="lang-flag">${l.flag}</span>
          <span class="lang-name">${l.name}</span>
        </div>`).join("")}
    </div>`;
  nav.appendChild(wrap);

  document.getElementById("langToggle").addEventListener("click", e => {
    e.stopPropagation();
    document.getElementById("langDropdown").classList.toggle("hidden");
  });
  document.addEventListener("click", () => {
    document.getElementById("langDropdown")?.classList.add("hidden");
  });
  wrap.querySelectorAll(".lang-option").forEach(opt => {
    opt.addEventListener("click", e => {
      e.stopPropagation();
      applyLanguage(opt.dataset.lang);
      document.getElementById("langDropdown").classList.add("hidden");
    });
  });
}

// ══════════════════════════════════════════════
// 5. APPLY LANGUAGE
// ══════════════════════════════════════════════
function applyLanguage(code) {
  currentLang = code;
  const t = LANG[code];

  const lbl = document.getElementById("langLabel");
  if (lbl) lbl.textContent = `${t.flag} ${code.toUpperCase()}`;
  document.querySelectorAll(".lang-option").forEach(o =>
    o.classList.toggle("active", o.dataset.lang === code)
  );

  const badge = document.querySelector(".hero-badge span");
  if (badge) badge.textContent = t.badge;

  const titleEl = document.querySelector(".hero-title");
  if (titleEl) {
    titleEl.innerHTML = `${t.title1} <span class="gradient-text">${t.title2}</span> ${t.title3}${t.title4 ? ` <span class="gradient-text">${t.title4}</span>` : ""}`;
  }

  setText(".hero-subtitle", t.subtitle);
  setText("#loading p", t.loadingText);
  setText(".answer-header h3", t.resultTitle);

  const inp = document.getElementById("ecoReviveInput");
  if (inp) inp.placeholder = t.placeholder;

  const btnSpan = document.querySelector(".ai-button span");
  if (btnSpan) btnSpan.textContent = t.askBtn;

  const sec = document.querySelectorAll(".section-title");
  if (sec[0]) sec[0].textContent = t.featuresTitle;
  if (sec[1]) sec[1].textContent = t.examplesTitle;

  const fd = [[t.f1t,t.f1d],[t.f2t,t.f2d],[t.f3t,t.f3d],[t.f4t,t.f4d]];
  document.querySelectorAll(".feature-card").forEach((card, i) => {
    if (!fd[i]) return;
    const h3 = card.querySelector("h3"); const p = card.querySelector("p");
    if (h3) h3.textContent = fd[i][0];
    if (p)  p.textContent  = fd[i][1];
  });

  const sl = [t.s1, t.s2, t.s3, t.s4];
  document.querySelectorAll(".stat-item p").forEach((p,i) => { if (sl[i]) p.textContent = sl[i]; });

  setText(".footer-section p", t.footerTag);
  setText(".footer-bottom p", t.footerCopy);
}

function setText(sel, text) {
  const el = document.querySelector(sel);
  if (el) el.textContent = text;
}

// ══════════════════════════════════════════════
// 6. FILL INPUT
// ══════════════════════════════════════════════
function fillInput(value) {
  const inp = document.getElementById("ecoReviveInput");
  if (inp) { inp.value = value; inp.focus(); }
  document.querySelector(".hero")?.scrollIntoView({ behavior:"smooth", block:"start" });
}

// ══════════════════════════════════════════════
// 7. MAIN ASK AI
// ══════════════════════════════════════════════
async function askAI() {
  const inp           = document.getElementById("ecoReviveInput");
  const loading       = document.getElementById("loading");
  const answerSection = document.getElementById("answerSection");
  const answerDiv     = document.getElementById("answer");
  const videoDiv      = document.getElementById("video");
  const t             = LANG[currentLang];

  const query = inp?.value.trim();
  if (!query) { showNotification(t.notifyEmpty, "warning"); return; }

  // reset
  loading.classList.remove("hidden");
  answerSection.classList.add("hidden");
  videoDiv.innerHTML = "";

  try {
    const res = await fetch("/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ecoRevive:       query,
        langInstruction: t.langInstruction
      })
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Server error");

    const rawText = data.text || "";
    if (!rawText) throw new Error("Empty response");

    // ── Show AI answer ────────────────────────
    answerDiv.innerHTML = formatMarkdown(rawText);
    answerSection.classList.remove("hidden");
    answerSection.scrollIntoView({ behavior:"smooth", block:"nearest" });

    // ── Show Video ────────────────────────────
    const videoId = data.videoId;
    if (videoId) {
      renderVideoEmbed(videoId, query, t);
    } else {
      renderVideoFallback(query, t);
    }

    showNotification(t.notifySuccess, "success");

  } catch (err) {
    console.error("askAI error:", err);
    showNotification(t.notifyError, "error");
  } finally {
    loading.classList.add("hidden");
  }
}

// ══════════════════════════════════════════════
// 8. FORMAT MARKDOWN → HTML
// ══════════════════════════════════════════════
function formatMarkdown(text) {
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  let html = text
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^### (.+)$/gm,  "<h3>$1</h3>")
    .replace(/^## (.+)$/gm,   "<h2>$1</h2>")
    .replace(/^# (.+)$/gm,    "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
    .replace(/__(.+?)__/g,    "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g,    "<em>$1</em>")
    .replace(/^---+$/gm,      "<hr>")
    .replace(/^[\-\*\•] (.+)$/gm, "%%UL%%$1%%END%%")
    .replace(/^\d+[\.\)] (.+)$/gm, "%%OL%%$1%%END%%");

  html = html.replace(/(%%UL%%.*?%%END%%\n?)+/gs, match => {
    const items = match.replace(/%%UL%%(.*?)%%END%%\n?/g, "<li>$1</li>");
    return `<ul>${items}</ul>`;
  });
  html = html.replace(/(%%OL%%.*?%%END%%\n?)+/gs, match => {
    const items = match.replace(/%%OL%%(.*?)%%END%%\n?/g, "<li>$1</li>");
    return `<ol>${items}</ol>`;
  });

  html = html.split("\n").map(line => {
    line = line.trim();
    if (!line) return "";
    if (/^<(h[1-6]|ul|ol|li|hr|blockquote|div|p)/.test(line)) return line;
    return `<p>${line}</p>`;
  }).join("\n");

  return html;
}

// ══════════════════════════════════════════════
// 9. RENDER VIDEO EMBED  ← THE FIXED PART
// ══════════════════════════════════════════════
function renderVideoEmbed(videoId, query, t) {
  const videoDiv = document.getElementById("video");
  const searchQ  = encodeURIComponent(`${query} waste to wealth recycling`);

  videoDiv.innerHTML = `
    <div class="video-card">
      <div class="video-card-header">
        <div class="video-header-icon"><i class="fas fa-play"></i></div>
        <h3>${t.videoTitle}</h3>
      </div>

      <div class="video-embed-wrapper">
        <iframe
          src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white"
          title="${query} waste transformation"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>

      <div class="video-footer">
        <a href="https://www.youtube.com/watch?v=${videoId}"
           target="_blank" class="video-yt-link">
          <i class="fab fa-youtube"></i> Watch on YouTube
        </a>
        <a href="https://www.youtube.com/results?search_query=${searchQ}"
           target="_blank" class="video-more-link">
          <i class="fas fa-search"></i> More Videos
        </a>
      </div>
    </div>`;

  videoDiv.scrollIntoView({ behavior:"smooth", block:"nearest" });
}

// Fallback when no videoId
function renderVideoFallback(query, t) {
  const videoDiv = document.getElementById("video");
  const searchQ  = encodeURIComponent(`${query} waste to wealth recycling`);

  videoDiv.innerHTML = `
    <div class="video-card">
      <div class="video-card-header">
        <div class="video-header-icon"><i class="fas fa-play"></i></div>
        <h3>${t.videoTitle}</h3>
      </div>
      <div class="video-search-fallback">
        <i class="fab fa-youtube fallback-yt-icon"></i>
        <p>${t.noVideo}</p>
        <a href="https://www.youtube.com/results?search_query=${searchQ}"
           target="_blank" class="video-yt-search-btn">
          <i class="fab fa-youtube"></i> Search on YouTube
        </a>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════
// 10. EVENTS
// ══════════════════════════════════════════════
function attachEvents() {
  document.getElementById("ecoReviveInput")?.addEventListener("keypress", e => {
    if (e.key === "Enter") askAI();
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))?.scrollIntoView({ behavior:"smooth", block:"start" });
    });
  });

  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.pageYOffset > 80
      ? "0 2px 20px rgba(15,35,24,0.1)" : "none";
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        if (entry.target.classList.contains("stat-number")) animateCounter(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:"0px 0px -60px 0px" });

  document.querySelectorAll(".feature-card,.example-card,.stat-item,.stat-number").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    obs.observe(el);
  });
}

// ══════════════════════════════════════════════
// 11. COUNTER ANIMATION
// ══════════════════════════════════════════════
function animateCounter(el) {
  const text = el.textContent;
  const suffix = text.replace(/[0-9]/g, "");
  const target = parseInt(text.replace(/\D/g, "")) || 0;
  let cur = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur + suffix;
    if (cur >= target) clearInterval(timer);
  }, 20);
}

// ══════════════════════════════════════════════
// 12. NOTIFICATION
// ══════════════════════════════════════════════
function showNotification(message, type = "info") {
  document.querySelectorAll(".eco-notif").forEach(n => n.remove());
  const colors = { success:"var(--green-dim)", warning:"#d4900a", error:"#c0392b", info:"var(--green-mid)" };
  const icons  = { success:"fa-check-circle", warning:"fa-exclamation-triangle", error:"fa-times-circle", info:"fa-info-circle" };
  const notif  = document.createElement("div");
  notif.className = "eco-notif";
  notif.innerHTML = `<i class="fas ${icons[type]||icons.info}"></i> ${message}`;
  Object.assign(notif.style, {
    position:"fixed", top:"90px", right:"20px",
    display:"flex", alignItems:"center", gap:"10px",
    padding:"14px 20px",
    background: colors[type]||colors.info,
    color:"#fff", borderRadius:"var(--radius-md)",
    boxShadow:"var(--shadow-md)",
    fontFamily:"var(--font-body)", fontSize:"0.9rem", fontWeight:"600",
    zIndex:"99999", maxWidth:"320px",
    animation:"ecoSlideIn 0.3s ease both"
  });
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.style.animation = "ecoSlideOut 0.3s ease both";
    setTimeout(() => notif.remove(), 350);
  }, 3500);
}

// ══════════════════════════════════════════════
// 13. ALL INJECTED STYLES
// ══════════════════════════════════════════════
function injectAllStyles() {
  const s = document.createElement("style");
  s.textContent = `
    .lang-switcher { position:relative; }
    .lang-btn {
      display:flex; align-items:center; gap:7px;
      background:var(--green-light); border:1.5px solid var(--border-card);
      border-radius:var(--radius-lg); padding:8px 16px; cursor:pointer;
      font-family:var(--font-display); font-size:0.85rem; font-weight:700;
      color:var(--green-dim); user-select:none; transition:var(--transition); white-space:nowrap;
    }
    .lang-btn:hover { border-color:var(--green-vivid); box-shadow:0 0 0 3px rgba(22,168,90,0.12); }
    .lang-arrow { font-size:0.6rem; }
    .lang-dropdown {
      position:absolute; top:calc(100% + 10px); right:0;
      background:var(--bg-card); border:1.5px solid var(--border-card);
      border-radius:var(--radius-md); box-shadow:var(--shadow-md);
      overflow:hidden; z-index:9999; min-width:168px; animation:fadeUp 0.2s ease both;
    }
    .lang-option {
      display:flex; align-items:center; gap:10px; padding:11px 16px;
      font-size:0.88rem; font-weight:500; color:var(--text-secondary);
      cursor:pointer; transition:background 0.2s,color 0.2s;
      border-bottom:1px solid var(--border-card);
    }
    .lang-option:last-child { border-bottom:none; }
    .lang-option:hover,.lang-option.active { background:var(--green-light); color:var(--green-dim); }
    .lang-option.active { font-weight:700; }
    .lang-flag { font-size:1.1rem; }

    /* Video Card */
    .video-card {
      background:var(--bg-card); border:1.5px solid var(--border-card);
      border-radius:var(--radius-md); box-shadow:var(--shadow-md);
      overflow:hidden; margin-top:20px; animation:fadeUp 0.5s ease both;
    }
    .video-card-header {
      display:flex; align-items:center; gap:12px; padding:16px 24px;
      background:linear-gradient(135deg, var(--green-dim), var(--green-mid)); color:#fff;
    }
    .video-header-icon {
      width:34px; height:34px; background:rgba(255,255,255,0.18); border-radius:50%;
      display:flex; align-items:center; justify-content:center; font-size:0.9rem; flex-shrink:0;
    }
    .video-card-header h3 { font-family:var(--font-display); font-size:1rem; font-weight:700; }

    /* ✅ KEY FIX: 16:9 responsive iframe */
    .video-embed-wrapper {
      position:relative; width:100%; padding-bottom:56.25%; height:0; background:#000;
    }
    .video-embed-wrapper iframe {
      position:absolute; top:0; left:0; width:100%; height:100%; border:none; display:block;
    }

    .video-footer {
      display:flex; align-items:center; gap:16px; padding:12px 20px;
      border-top:1px solid var(--border-card); flex-wrap:wrap;
    }
    .video-yt-link {
      display:inline-flex; align-items:center; gap:6px;
      font-size:0.88rem; font-weight:600; color:#c00; text-decoration:none; transition:opacity 0.2s;
    }
    .video-yt-link:hover { opacity:0.75; }
    .video-more-link {
      display:inline-flex; align-items:center; gap:6px;
      font-size:0.88rem; font-weight:600; color:var(--green-dim);
      text-decoration:none; transition:opacity 0.2s;
    }
    .video-more-link:hover { opacity:0.75; }
    .video-search-fallback { padding:32px 24px; text-align:center; }
    .fallback-yt-icon { font-size:3rem; color:#ff0000; margin-bottom:12px; display:block; }
    .video-search-fallback p { color:var(--text-muted); margin-bottom:18px; font-size:0.92rem; }
    .video-yt-search-btn {
      display:inline-flex; align-items:center; gap:8px;
      background:#ff0000; color:#fff; padding:12px 28px;
      border-radius:var(--radius-lg); font-weight:700;
      font-family:var(--font-display); font-size:0.92rem;
      text-decoration:none; transition:opacity 0.2s,transform 0.2s;
      box-shadow:0 4px 14px rgba(255,0,0,0.3);
    }
    .video-yt-search-btn:hover { opacity:0.9; transform:translateY(-2px); }

    @keyframes ecoSlideIn {
      from { transform:translateX(380px); opacity:0; }
      to   { transform:translateX(0);     opacity:1; }
    }
    @keyframes ecoSlideOut {
      from { transform:translateX(0);     opacity:1; }
      to   { transform:translateX(380px); opacity:0; }
    }
  `;
  document.head.appendChild(s);
}

console.log("🌿 EcoRevive AI — Ready!");
