import React, { useState, useEffect, useRef, useContext, createContext } from "react";

/* ============================================================
   جمعية الإمارات للصم — UAE Deaf Association
   نسخة ثنائية اللغة (عربي/إنجليزي) + صفحات مستقلة لكل قسم
   ============================================================ */

const LOGO_DATA_URI =
  "data:image/png;base64,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";

/* ---------------- الألوان ---------------- */
const C = {
  ink: "#12181A",
  inkSoft: "#1B2426",
  inkSofter: "#26312F",
  emerald: "#0E7C5A",
  emeraldLight: "#17A876",
  emeraldPale: "#E6F3ED",
  crimson: "#C6303E",
  crimsonPale: "#FBE9EA",
  gold: "#C9972E",
  sand: "#F7F5F0",
  sandDark: "#EDE8DD",
  paper: "#FFFFFF",
  text: "#1B2321",
  muted: "#66716D",
  line: "#E4E0D4",
};

const FONTS_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Tajawal:wght@300;400;500;700;900&display=swap');";

const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const goToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ============================================================
   نظام اللغة (Context)
   ============================================================ */
const LangContext = createContext(null);
const useLang = () => useContext(LangContext);

const T = {
  ar: {
    dir: "rtl",
    code: "ar",
    switchLabel: "EN",
    topbar: { addr: "أبوظبي، الإمارات العربية المتحدة" },
    nav: {
      home: "الرئيسية",
      about: "عن الجمعية",
      services: "الخدمات الذكية",
      newBadge: "جديد",
      news: "الأخبار",
      events: "الأنشطة والفعاليات",
      arabweek: "أسبوع الأصم العربي",
      sermon: "خطبة الجمعة بلغة الاشارة",
      gallery: "معرض الصور",
      contact: "اتصل بنا",
      aboutChildren: ["نبذة", "الرؤية والرسالة", "الأهداف", "كلمة رئيس مجلس الإدارة", "أعضاء مجلس الإدارة", "الخطط"],
      servicesChildren: ["إصدار بطاقة العضوية", "إصدار بدل فاقد أو تالف لبطاقة العضوية", "تجديد بطاقة العضوية", "دليل للخدمات الجديدة"],
      eventsChildren: ["الفعاليات الداخلية", "الفعاليات الخارجية"],
    },
    breadcrumbHome: "الرئيسية",
    hero: {
      kicker: "جمعية أهلية معتمدة تحت مظلة وزارة تنمية المجتمع",
      titleA: "صوتٌ يُرى…",
      titleB: "ويدٌ تُسمَع",
      desc: "نعمل منذ أكثر من 18 عامًا على دمج أفراد الصم وضعاف السمع في المجتمع الإماراتي، عبر خدمات تأهيلية وتعليمية وترفيهية، وخدمات ذكية تُقرّب الجمعية من أعضائها أكثر من أي وقت مضى.",
      ctaPrimary: "استكشف الخدمات الذكية",
      ctaSecondary: "تعرّف على الجمعية",
      captionImg: "جمعية الإمارات للصم",
    },
    captions: [
      "التواصل حقّ… ولغة الإشارة جسرنا إليه",
      "خدماتنا الذكية بين يديك في أي وقت",
      "معًا نبني مجتمعًا يسمع بالعين",
      "أكثر من 6,200 عضو يثقون بجمعيتنا",
    ],
    stats: [
      { n: "+18", l: "سنة من العطاء" },
      { n: "+6,200", l: "عضو مسجل" },
      { n: "+340", l: "فعالية ونشاط" },
      { n: "7", l: "إمارات نخدمها" },
    ],
    homeExplore: {
      eyebrow: "اكتشف",
      title: "كل ما تحتاج معرفته في مكان واحد",
      desc: "اضغط على أي بطاقة لعرض صفحة مستقلة بكل التفاصيل.",
      cards: [
        { key: "about", t: "عن الجمعية", d: "نبذتنا، رؤيتنا، وأهدافنا" },
        { key: "services", t: "الخدمات الذكية", d: "أنجِز معاملاتك إلكترونيًا" },
        { key: "news", t: "الأخبار", d: "آخر مستجدات الجمعية" },
        { key: "events", t: "الفعاليات", d: "أنشطة داخلية وخارجية" },
        { key: "arabweek", t: "أسبوع الأصم العربي", d: "احتفالية سنوية" },
        { key: "sermon", t: "خطبة الجمعة بالإشارة", d: "ترجمة أسبوعية" },
        { key: "gallery", t: "معرض الصور", d: "لحظات من فعالياتنا" },
        { key: "contact", t: "اتصل بنا", d: "نحن هنا لمساعدتك" },
      ],
    },
    sectionEyebrow: {
      about: "عن الجمعية",
      services: "جديد",
      news: "جديدنا",
      events: "التقويم",
      arabweek: "فعالية سنوية",
      sermon: "أسبوعيًا",
      gallery: "بالصور",
      contact: "تواصل معنا",
    },
    about: {
      title: "عن الجمعية",
      desc: "تعرّف على رحلتنا ورؤيتنا وأهدافنا وأعضاء مجلس إدارتنا.",
      introTitle: "نبذة",
      intro:
        "تأسست جمعية الإمارات للصم لتكون البيت الجامع لأفراد الصم وضعاف السمع في الدولة، ولتوفير بيئة داعمة تحفظ حقوقهم وتفتح أمامهم آفاق التعليم والعمل والمشاركة المجتمعية الكاملة، إيمانًا منّا بأن الإعاقة السمعية لا تحدّ من الطموح. منذ انطلاقتنا قبل أكثر من 18 عامًا، توسّعت خدماتنا لتشمل التأهيل السمعي والنفسي، وبرامج تعليم لغة الإشارة، والدمج المجتمعي، والأنشطة الثقافية والرياضية لجميع الأعمار.",
      visionTitle: "الرؤية والرسالة",
      visionText: "رؤيتنا: مجتمع إماراتي شامل يوفّر لكل فرد من الصم وضعاف السمع فرصًا متكافئة للتعليم والعمل والمشاركة الفاعلة. رسالتنا: تقديم خدمات تأهيلية وتعليمية وتوعوية نوعية، والدفاع عن حقوق أعضائنا، وبناء جسور تواصل حقيقية بينهم وبين المجتمع.",
      goalsTitle: "الأهداف",
      goals: [
        "تمكين أفراد الصم وضعاف السمع من الاندماج التعليمي والمهني.",
        "نشر لغة الإشارة الإماراتية وتيسير تعلّمها للأسر والمترجمين.",
        "تقديم خدمات تأهيل سمعي ونفسي واستشارات أسرية مجانية أو مخفّضة.",
        "تنظيم فعاليات وأنشطة ثقافية ورياضية وترفيهية على مدار العام.",
        "تطوير خدمات ذكية تسهّل على الأعضاء إنجاز معاملاتهم عن بُعد.",
      ],
      chairmanTitle: "كلمة رئيس مجلس الإدارة",
      chairmanSub: "رسالة إلى كل أعضاء الجمعية",
      chairmanQuote:
        "نفخر بكل خطوة نخطوها مع أعضاء الجمعية، ونجدد التزامنا بأن تبقى منصّتنا الذكية ومقارّنا مفتوحة دومًا لخدمتكم، فأنتم سبب وجودنا واستمرارنا.",
      boardTitle: "أعضاء مجلس الإدارة",
      board: [
        { r: "رئيس مجلس الإدارة", n: "سعادة/ راشد المنصوري" },
        { r: "نائب رئيس مجلس الإدارة", n: "أ. مريم الكعبي" },
        { r: "الأمين العام", n: "أ. خالد النعيمي" },
        { r: "أمين الصندوق", n: "أ. فاطمة الزعابي" },
        { r: "عضو مجلس إدارة", n: "أ. سلطان الشامسي" },
        { r: "عضو مجلس إدارة", n: "أ. عائشة المهيري" },
      ],
      plansTitle: "الخطط",
      plans: [
        { t: "الخطة الاستراتيجية 2026–2028", d: "توسعة الخدمات الذكية وزيادة عدد المستفيدين بنسبة 40%." },
        { t: "مركز التأهيل السمعي الجديد", d: "افتتاح فرع متكامل في أبوظبي يخدم كافة الإمارات." },
        { t: "برنامج المترجمين المعتمدين", d: "تأهيل 100 مترجم لغة إشارة معتمد على مستوى الدولة." },
      ],
    },
    services: {
      title: "الخدمات الذكية",
      desc: "أنجِز معاملاتك المتعلقة بعضويتك في الجمعية إلكترونيًا، بخطوات واضحة وسريعة.",
      startNow: "ابدأ الآن",
      guideTitle: "دليل الخدمات الجديدة",
      guideDesc: "خطوات إنجاز كل خدمة من خدماتنا الذكية بشكل مبسّط.",
      list: [
        { t: "إصدار بطاقة العضوية", d: "قدّم طلبك الآن واحصل على بطاقة عضويتك الرسمية إلكترونيًا خلال أيام.", i: "card", code: "DC", fee: 105 },
        { t: "إصدار بدل فاقد أو تالف", d: "فقدت بطاقتك أو تلفت؟ أصدر بدلًا عنها بخطوات بسيطة من أي مكان.", i: "refresh", code: "RCS", fee: 50 },
        { t: "تجديد بطاقة العضوية", d: "جدّد عضويتك السنوية إلكترونيًا دون الحاجة لزيارة المقر.", i: "renew", code: "RCS", fee: 105 },
        { t: "دليل الخدمات الجديدة", d: "كل ما تحتاج معرفته عن خدماتنا الذكية في مكان واحد.", i: "guide", code: "SG", fee: 0 },
      ],
      overlay: { back: "رجوع", code: "رمز الخدمة:", start: "بدء الخدمة", running: "جارٍ تنفيذ الخدمة...", fee: "رسوم الخدمة", free: "بدون رسوم", success: "تم استلام طلبك بنجاح، سيصلك تحديث حالة الطلب عبر البريد الإلكتروني المسجل لدى الجمعية.", close: "إغلاق" },
    },
    news: {
      title: "آخر الأخبار",
      desc: "تابع مستجدات الجمعية وأنشطتها أولًا بأول.",
      readMore: "اقرأ التفصيل",
      list: [
        { t: "افتتاح مركز التأهيل السمعي الجديد في أبوظبي", d: "3 يوليو 2026", tag: "أخبار الجمعية", body: "افتتحت الجمعية مركزها الجديد للتأهيل السمعي في أبوظبي، ويقدّم المركز خدمات تقييم السمع، والتأهيل النفسي، وجلسات تدريب على لغة الإشارة للأسر، ضمن رؤية الجمعية للتوسّع في خدماتها التأهيلية على مستوى الدولة." },
        { t: "توقيع مذكرة تفاهم مع هيئة تنمية المجتمع", d: "28 يونيو 2026", tag: "شراكات", body: "وقّعت الجمعية مذكرة تفاهم مع هيئة تنمية المجتمع لتعزيز برامج الدمج المجتمعي وتطوير خدمات الدعم المقدّمة لأفراد الصم وضعاف السمع في أبوظبي." },
        { t: "إطلاق دورة تدريبية للغة الإشارة للمترجمين الجدد", d: "20 يونيو 2026", tag: "تدريب", body: "أطلقت الجمعية دورة تدريبية مكثّفة لتأهيل مترجمي لغة الإشارة الجدد، بهدف رفع عدد المترجمين المعتمدين وتحسين جودة الخدمة المقدّمة لأعضاء الجمعية." },
      ],
    },
    events: {
      title: "الأنشطة والفعاليات القادمة",
      desc: "فعاليات داخلية وخارجية على مدار العام.",
      internal: "الفعاليات الداخلية",
      external: "الفعاليات الخارجية",
      details: "التفاصيل",
      list: [
        { t: "ملتقى أسر الصم السنوي", loc: "أبوظبي", d: "12 يوليو", type: "داخلية" },
        { t: "معرض المنتجات اليدوية لأعضاء الجمعية", loc: "دبي", d: "20 يوليو", type: "داخلية" },
        { t: "المشاركة في المنتدى الخليجي لذوي الإعاقة", loc: "الرياض", d: "2 أغسطس", type: "خارجية" },
        { t: "ورشة توعوية بلغة الإشارة لمدارس أبوظبي", loc: "أبوظبي", d: "15 أغسطس", type: "داخلية" },
        { t: "المشاركة في مؤتمر الاتحاد العربي للصم", loc: "القاهرة", d: "9 سبتمبر", type: "خارجية" },
      ],
    },
    arabweek: {
      title: "أسبوع الأصم العربي",
      kicker: "فعالية سنوية",
      body: "نحتفل سنويًا بأسبوع الأصم العربي عبر فعاليات توعوية وثقافية تبرز إنجازات مجتمع الصم في الوطن العربي، وتشمل ورش عمل ومعارض فنية ومحاضرات توعوية بمشاركة جمعيات ومؤسسات من مختلف الدول العربية.",
      points: ["ورش عمل توعوية عن حقوق الصم", "معرض فني لإبداعات أعضاء الجمعية", "لقاءات مع وفود عربية شريكة", "جوائز تقديرية لأبرز الإنجازات"],
      cta: "اكتشف الفعاليات",
    },
    sermon: {
      title: "خطبة الجمعة بلغة الإشارة",
      kicker: "أسبوعيًا",
      body: "تابع ترجمة خطبة الجمعة بلغة الإشارة الإماراتية أسبوعيًا عبر منصاتنا لتبقى على تواصل دائم مع محتوى ديني موثوق ومترجم باحترافية من قِبل مترجمين معتمدين.",
      points: ["ترجمة مباشرة كل يوم جمعة", "أرشيف لخطب سابقة", "مترجمون معتمدون من الجمعية"],
      cta: "مشاهدة آخر خطبة",
    },
    gallery: {
      title: "معرض الصور",
      desc: "لحظات من فعاليات وأنشطة جمعيتنا.",
    },
    contact: {
      title: "اتصل بنا",
      hq: "المقر الرئيسي",
      hqVal: "أبوظبي – شارع المرور – الإمارات العربية المتحدة",
      hotline: "الخط الساخن",
      emailLabel: "البريد الإلكتروني",
      formName: "الاسم الكامل",
      formPhone: "رقم الهاتف",
      formEmail: "البريد الإلكتروني",
      formMsg: "اكتب رسالتك هنا...",
      send: "إرسال الرسالة",
      sent: "تم إرسال رسالتك بنجاح، سيتواصل معك فريقنا قريبًا.",
    },
    footer: {
      quickLinks: "روابط سريعة",
      follow: "تابعنا",
      rights: "جميع الحقوق محفوظة",
    },
    sign: {
      title: "تواصل بلغة الإشارة",
      floating: "تواصل بلغة الإشارة",
      startListen: "ابدأ التحدث الآن",
      stopListen: "إيقاف الاستماع",
      placeholderText: "سيظهر كلامك هنا كنص فور بدء التحدث...",
      typeLabel: "أو اكتب كلمة/جملة لعرض تهجئتها بالإشارة:",
      typePlaceholder: "اكتب هنا...",
      show: "عرض التهجئة",
      fingerspellTitle: "تهجئة آخر كلمة بالإشارة (عرض تعليمي)",
      fingerspellEmpty: "اكتب كلمة أو تحدّث ليبدأ عرض التهجئة بالإشارة...",
      note: "* أداة مساعدة تجريبية ولا تغني عن مترجم لغة إشارة معتمد في المواقف الرسمية.",
      micUnsupported: "متصفحك الحالي لا يدعم التعرف الصوتي مباشرة، لكن يمكنك استخدام خانة الكتابة أدناه وستعمل بشكل طبيعي.",
      micDenied: "تم رفض إذن الميكروفون. يمكنك استخدام خانة الكتابة أدناه بدلًا من ذلك.",
    },
    bot: {
      title: "المساعد الذكي",
      hello: "أهلًا بك 👋 أنا المساعد الذكي لجمعية الإمارات للصم. اسألني عن الخدمات، الفعاليات، أو طرق التواصل.",
      placeholder: "اكتب سؤالك هنا...",
      fallback: "لم أجد إجابة دقيقة لسؤالك، يمكنك التواصل مع فريقنا مباشرة عبر قسم «اتصل بنا» وسنسعد بمساعدتك.",
      faq: [
        { k: ["عضوية", "بطاقة", "اصدار", "إصدار"], a: "لإصدار بطاقة العضوية: افتح قسم «الخدمات الذكية» ثم اختر «إصدار بطاقة العضوية». رسوم الخدمة 105 درهم." },
        { k: ["فاقد", "تالف", "بدل"], a: "لإصدار بدل فاقد أو تالف لبطاقتك: من «الخدمات الذكية» اختر «إصدار بدل فاقد أو تالف». رسوم الخدمة 50 درهم." },
        { k: ["تجديد"], a: "لتجديد بطاقة العضوية السنوية: من «الخدمات الذكية» اختر «تجديد بطاقة العضوية». رسوم الخدمة 105 درهم." },
        { k: ["ساعات", "دوام", "وقت", "مواعيد"], a: "نستقبلكم من الأحد إلى الخميس، من 8 صباحًا حتى 3 عصرًا." },
        { k: ["عنوان", "مقر", "موقع", "وين", "فين"], a: "مقرنا الرئيسي في أبوظبي - شارع المرور. راجع قسم «اتصل بنا»." },
        { k: ["هاتف", "رقم", "اتصال", "تليفون"], a: "يمكنك التواصل معنا على الخط الساخن 800-DEAF (3323) أو عبر info@uaedeaf.ae." },
        { k: ["فعالية", "فعاليات", "نشاط", "انشطة", "أنشطة"], a: "تجد كل فعالياتنا في قسم «الأنشطة والفعاليات»." },
        { k: ["خطبة", "جمعة"], a: "نبث خطبة الجمعة مترجمة بلغة الإشارة أسبوعيًا، في قسم «خطبة الجمعة بلغة الاشارة»." },
        { k: ["اشارة", "إشارة", "لغة"], a: "لدينا ميزة «تواصل بلغة الإشارة» أسفل الشاشة تحوّل حديثك أو كتابتك إلى تهجئة بالإشارة." },
        { k: ["مرحبا", "اهلا", "أهلاً", "السلام", "هاي"], a: "أهلًا بك في جمعية الإمارات للصم 👋 كيف يمكنني مساعدتك اليوم؟" },
      ],
    },
    common: { back: "رجوع للرئيسية" },
  },

  en: {
    dir: "ltr",
    code: "en",
    switchLabel: "AR",
    topbar: { addr: "Abu Dhabi, United Arab Emirates" },
    nav: {
      home: "Home",
      about: "About Us",
      services: "Smart Services",
      newBadge: "New",
      news: "News",
      events: "Activities & Events",
      arabweek: "Arab Deaf Week",
      sermon: "Friday Sermon in Sign Language",
      gallery: "Gallery",
      contact: "Contact Us",
      aboutChildren: ["Overview", "Vision & Mission", "Goals", "Chairman's Message", "Board Members", "Strategic Plans"],
      servicesChildren: ["Issue Membership Card", "Replace Lost or Damaged Card", "Renew Membership Card", "New Services Guide"],
      eventsChildren: ["Internal Events", "External Events"],
    },
    breadcrumbHome: "Home",
    hero: {
      kicker: "A licensed non-profit association under the Community Development Authority",
      titleA: "A voice that is seen…",
      titleB: "a hand that is heard",
      desc: "For over 18 years we've worked to integrate deaf and hard-of-hearing individuals into UAE society, through rehabilitation, education and recreational services, plus smart digital services that bring the association closer to its members than ever.",
      ctaPrimary: "Explore Smart Services",
      ctaSecondary: "Learn About Us",
      captionImg: "UAE Deaf Association",
    },
    captions: [
      "Communication is a right… sign language is our bridge to it",
      "Our smart services are in your hands, anytime",
      "Together we build a community that hears with its eyes",
      "Over 6,200 members trust our association",
    ],
    stats: [
      { n: "18+", l: "Years of giving" },
      { n: "6,200+", l: "Registered members" },
      { n: "340+", l: "Events & activities" },
      { n: "7", l: "Emirates we serve" },
    ],
    homeExplore: {
      eyebrow: "Explore",
      title: "Everything you need, in one place",
      desc: "Tap any card to open a dedicated page with full details.",
      cards: [
        { key: "about", t: "About Us", d: "Our story, vision and goals" },
        { key: "services", t: "Smart Services", d: "Handle your requests online" },
        { key: "news", t: "News", d: "Latest association updates" },
        { key: "events", t: "Events", d: "Internal & external activities" },
        { key: "arabweek", t: "Arab Deaf Week", d: "Annual celebration" },
        { key: "sermon", t: "Friday Sermon in Sign", d: "Weekly translation" },
        { key: "gallery", t: "Gallery", d: "Moments from our events" },
        { key: "contact", t: "Contact Us", d: "We're here to help" },
      ],
    },
    sectionEyebrow: {
      about: "About Us",
      services: "New",
      news: "What's New",
      events: "Calendar",
      arabweek: "Annual event",
      sermon: "Weekly",
      gallery: "Gallery",
      contact: "Get in touch",
    },
    about: {
      title: "About Us",
      desc: "Learn about our story, vision, goals and board members.",
      introTitle: "Overview",
      intro:
        "The UAE Deaf Association was founded to be the shared home of deaf and hard-of-hearing individuals in the country, providing a supportive environment that protects their rights and opens doors to education, employment and full community participation — because hearing loss never limits ambition. Over more than 18 years, our services have expanded to include hearing and psychological rehabilitation, sign language education programs, community integration, and cultural and sports activities for all ages.",
      visionTitle: "Vision & Mission",
      visionText: "Vision: An inclusive UAE society that offers every deaf and hard-of-hearing individual equal opportunities in education, employment and active participation. Mission: To deliver high-quality rehabilitation, education and awareness services, advocate for our members' rights, and build genuine bridges of communication between them and the wider community.",
      goalsTitle: "Goals",
      goals: [
        "Empowering deaf and hard-of-hearing individuals to integrate educationally and professionally.",
        "Spreading Emirati Sign Language and making it easier for families and interpreters to learn.",
        "Providing free or subsidized hearing rehabilitation, psychological and family counselling services.",
        "Organizing cultural, sports and recreational events and activities throughout the year.",
        "Developing smart services that make it easy for members to complete transactions remotely.",
      ],
      chairmanTitle: "Chairman's Message",
      chairmanSub: "A message to all our members",
      chairmanQuote:
        "We take pride in every step we take with our members, and we renew our commitment to keeping our smart platform and offices always open to serve you — you are the reason we exist and continue.",
      boardTitle: "Board Members",
      board: [
        { r: "Chairman of the Board", n: "H.E. Rashed Al Mansouri" },
        { r: "Vice Chairman", n: "Ms. Mariam Al Kaabi" },
        { r: "Secretary General", n: "Mr. Khalid Al Nuaimi" },
        { r: "Treasurer", n: "Ms. Fatima Al Zaabi" },
        { r: "Board Member", n: "Mr. Sultan Al Shamsi" },
        { r: "Board Member", n: "Ms. Aisha Al Mheiri" },
      ],
      plansTitle: "Strategic Plans",
      plans: [
        { t: "2026–2028 Strategic Plan", d: "Expanding smart services and increasing beneficiaries by 40%." },
        { t: "New Hearing Rehabilitation Center", d: "Opening a full-service branch in Abu Dhabi serving all emirates." },
        { t: "Certified Interpreters Program", d: "Training 100 certified sign language interpreters nationwide." },
      ],
    },
    services: {
      title: "Smart Services",
      desc: "Complete your membership transactions online, in clear and fast steps.",
      startNow: "Start Now",
      guideTitle: "New Services Guide",
      guideDesc: "A simplified walkthrough of how to complete each smart service.",
      list: [
        { t: "Issue Membership Card", d: "Apply now and receive your official membership card electronically within days.", i: "card", code: "DC", fee: 105 },
        { t: "Replace Lost or Damaged Card", d: "Lost or damaged your card? Get a replacement in simple steps from anywhere.", i: "refresh", code: "RCS", fee: 50 },
        { t: "Renew Membership Card", d: "Renew your annual membership online without visiting our offices.", i: "renew", code: "RCS", fee: 105 },
        { t: "New Services Guide", d: "Everything you need to know about our smart services, in one place.", i: "guide", code: "SG", fee: 0 },
      ],
      overlay: { back: "Back", code: "Service Code:", start: "Start Service", running: "Processing your request...", fee: "Service Fee", free: "Free of charge", success: "Your request has been received. You'll get a status update via your registered email.", close: "Close" },
    },
    news: {
      title: "Latest News",
      desc: "Keep up with the association's latest updates and activities.",
      readMore: "Read more",
      list: [
        { t: "New Hearing Rehabilitation Center Opens in Abu Dhabi", d: "July 3, 2026", tag: "Association News", body: "The association opened its new hearing rehabilitation center in Abu Dhabi, offering hearing assessments, psychological rehabilitation, and sign-language training sessions for families, as part of the association's plan to expand rehabilitation services nationwide." },
        { t: "MoU Signed with the Community Development Authority", d: "June 28, 2026", tag: "Partnerships", body: "The association signed a memorandum of understanding with the Community Development Authority to strengthen community integration programs and improve support services for deaf and hard-of-hearing individuals in Abu Dhabi." },
        { t: "New Sign Language Training Course for Interpreters Launched", d: "June 20, 2026", tag: "Training", body: "The association launched an intensive training course to qualify new sign language interpreters, aiming to increase the number of certified interpreters and improve the quality of service provided to members." },
      ],
    },
    events: {
      title: "Upcoming Activities & Events",
      desc: "Internal and external events throughout the year.",
      internal: "Internal Events",
      external: "External Events",
      details: "Details",
      list: [
        { t: "Annual Deaf Families Gathering", loc: "Abu Dhabi", d: "Jul 12", type: "internal" },
        { t: "Handicrafts Exhibition for Members", loc: "Dubai", d: "Jul 20", type: "internal" },
        { t: "Gulf Forum for People with Disabilities", loc: "Riyadh", d: "Aug 2", type: "external" },
        { t: "Sign Language Awareness Workshop for Abu Dhabi Schools", loc: "Abu Dhabi", d: "Aug 15", type: "internal" },
        { t: "Arab Federation of the Deaf Conference", loc: "Cairo", d: "Sep 9", type: "external" },
      ],
    },
    arabweek: {
      title: "Arab Deaf Week",
      kicker: "Annual event",
      body: "Every year we celebrate Arab Deaf Week with awareness and cultural events that highlight the achievements of the deaf community across the Arab world, including workshops, art exhibitions and awareness talks with participation from associations and institutions across the region.",
      points: ["Awareness workshops on deaf rights", "Art exhibition of members' creative work", "Meetings with partner Arab delegations", "Recognition awards for outstanding achievements"],
      cta: "Explore Events",
    },
    sermon: {
      title: "Friday Sermon in Sign Language",
      kicker: "Weekly",
      body: "Follow the weekly Friday sermon translated into Emirati Sign Language across our platforms, staying connected to trusted religious content professionally translated by certified interpreters.",
      points: ["Live translation every Friday", "Archive of past sermons", "Interpreters certified by the association"],
      cta: "Watch Latest Sermon",
    },
    gallery: {
      title: "Photo Gallery",
      desc: "Moments from our events and activities.",
    },
    contact: {
      title: "Contact Us",
      hq: "Headquarters",
      hqVal: "Abu Dhabi – Al Muroor Street – United Arab Emirates",
      hotline: "Hotline",
      emailLabel: "Email",
      formName: "Full Name",
      formPhone: "Phone Number",
      formEmail: "Email Address",
      formMsg: "Write your message here...",
      send: "Send Message",
      sent: "Your message has been sent. Our team will contact you soon.",
    },
    footer: {
      quickLinks: "Quick Links",
      follow: "Follow Us",
      rights: "All rights reserved",
    },
    sign: {
      title: "Sign Language Communication",
      floating: "Sign Language",
      startListen: "Start Speaking",
      stopListen: "Stop Listening",
      placeholderText: "Your speech will appear here as text once you start talking...",
      typeLabel: "Or type a word/sentence to see it fingerspelled:",
      typePlaceholder: "Type here...",
      show: "Show Fingerspelling",
      fingerspellTitle: "Fingerspelling of the last word (educational demo)",
      fingerspellEmpty: "Type a word or speak to start the fingerspelling display...",
      note: "* An experimental aid tool — not a substitute for a certified sign language interpreter in official settings.",
      micUnsupported: "Your browser doesn't support live speech recognition, but the text box below works normally.",
      micDenied: "Microphone access was denied. You can use the text box below instead.",
    },
    bot: {
      title: "AI Assistant",
      hello: "Welcome 👋 I'm the UAE Deaf Association assistant. Ask me about services, events, or how to reach us.",
      placeholder: "Type your question here...",
      fallback: "I couldn't find an exact answer. Please reach our team directly via the Contact Us page and we'll be happy to help.",
      faq: [
        { k: ["membership", "card", "issue"], a: "To issue a membership card: open 'Smart Services' then choose 'Issue Membership Card'. Fee: AED 105." },
        { k: ["lost", "damaged", "replace"], a: "To replace a lost or damaged card: from 'Smart Services' choose 'Replace Lost or Damaged Card'. Fee: AED 50." },
        { k: ["renew"], a: "To renew your annual membership: from 'Smart Services' choose 'Renew Membership Card'. Fee: AED 105." },
        { k: ["hours", "time", "open"], a: "We're open Sunday to Thursday, 8am to 3pm." },
        { k: ["address", "location", "where"], a: "Our HQ is in Abu Dhabi - Al Muroor Street. See the 'Contact Us' page." },
        { k: ["phone", "number", "call"], a: "Reach us on our hotline 800-DEAF (3323) or via info@uaedeaf.ae." },
        { k: ["event", "activity", "activities"], a: "Find all our events on the 'Activities & Events' page." },
        { k: ["sermon", "friday"], a: "We broadcast the Friday sermon translated into sign language weekly — see 'Friday Sermon in Sign Language'." },
        { k: ["sign", "language"], a: "Our 'Sign Language Communication' widget at the bottom of the screen turns your speech or typing into fingerspelling." },
        { k: ["hi", "hello", "hey"], a: "Welcome to the UAE Deaf Association 👋 How can I help you today?" },
      ],
    },
    common: { back: "Back to Home" },
  },
};

/* ============================================================
   بيانات التنقل (مبنية على الترجمة)
   ============================================================ */
const buildNav = (t) => [
  { label: t.nav.home, key: "home" },
  { label: t.nav.about, key: "about", children: t.nav.aboutChildren, anchors: ["about-intro", "about-vision", "about-goals", "about-chairman", "about-board", "about-plans"] },
  { label: t.nav.services, key: "services", badge: t.nav.newBadge, children: t.nav.servicesChildren, serviceIdx: [0, 1, 2, 3] },
  { label: t.nav.news, key: "news" },
  { label: t.nav.events, key: "events", children: t.nav.eventsChildren, anchors: ["events-internal", "events-external"] },
  { label: t.nav.arabweek, key: "arabweek" },
  { label: t.nav.sermon, key: "sermon" },
  { label: t.nav.gallery, key: "gallery" },
  { label: t.nav.contact, key: "contact" },
];

/* ---------------- أيقونات SVG ---------------- */
const Icon = ({ name, size = 22, color = "currentColor" }) => {
  const p = { stroke: color, strokeWidth: 1.8, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const box = { width: size, height: size, viewBox: "0 0 24 24" };
  switch (name) {
    case "hand":
      return (
        <svg {...box}>
          <path {...p} d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12" />
          <path {...p} d="M11 12V4a1.5 1.5 0 0 1 3 0v8" />
          <path {...p} d="M14 12V5a1.5 1.5 0 0 1 3 0v8" />
          <path {...p} d="M17 13v-2a1.5 1.5 0 0 1 3 0v5c0 3.5-2.5 6-6 6h-2c-2.2 0-3.4-.8-4.7-2.4L4 15.8c-.6-.8-.4-1.9.5-2.4.7-.4 1.6-.2 2.1.4L8 15" />
        </svg>
      );
    case "card":
      return (
        <svg {...box}>
          <rect {...p} x="3" y="6" width="18" height="13" rx="2" />
          <path {...p} d="M3 10h18" />
          <path {...p} d="M7 14.5h4" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...box}>
          <path {...p} d="M4 4v5h5" />
          <path {...p} d="M20 20v-5h-5" />
          <path {...p} d="M5.5 15A8 8 0 0 1 19 8.5" />
          <path {...p} d="M18.5 9A8 8 0 0 1 5 15.5" />
        </svg>
      );
    case "renew":
      return (
        <svg {...box}>
          <circle {...p} cx="12" cy="12" r="8.5" />
          <path {...p} d="M12 7.5V12l3 2" />
        </svg>
      );
    case "guide":
      return (
        <svg {...box}>
          <path {...p} d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5z" />
          <path {...p} d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5z" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...box}>
          <path {...p} d="M6 9l6 6 6-6" />
        </svg>
      );
    case "eye":
      return (
        <svg {...box}>
          <path {...p} d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z" />
          <circle {...p} cx="12" cy="12" r="2.6" />
        </svg>
      );
    case "target":
      return (
        <svg {...box}>
          <circle {...p} cx="12" cy="12" r="8" />
          <circle {...p} cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.2" fill={color} />
        </svg>
      );
    case "pin":
      return (
        <svg {...box}>
          <path {...p} d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z" />
          <circle {...p} cx="12" cy="9.5" r="2.3" />
        </svg>
      );
    case "phone":
      return (
        <svg {...box}>
          <path {...p} d="M6 3h3l1.5 4.5-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2L21 15v3a2 2 0 0 1-2 2C10.7 20 4 13.3 4 5a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...box}>
          <rect {...p} x="3" y="5" width="18" height="14" rx="2" />
          <path {...p} d="M4 6.5l8 6 8-6" />
        </svg>
      );
    case "wave":
      return (
        <svg {...box}>
          <path {...p} d="M2 12c1.5-4 2.5 4 4 0s2.5-4 4 0 2.5 4 4 0 2.5-4 4 0 2.5 4 4 0" />
        </svg>
      );
    case "video":
      return (
        <svg {...box}>
          <rect {...p} x="2" y="6" width="13" height="12" rx="2" />
          <path {...p} d="M15 10l6-3.5v11L15 14" />
        </svg>
      );
    case "chat":
      return (
        <svg {...box}>
          <path {...p} d="M4 5h16v11H9l-4 3.5V16H4z" />
          <path {...p} d="M8 9.5h8" />
          <path {...p} d="M8 12.5h5" />
        </svg>
      );
    case "mic":
      return (
        <svg {...box}>
          <rect {...p} x="9" y="3" width="6" height="11" rx="3" />
          <path {...p} d="M5.5 11a6.5 6.5 0 0 0 13 0" />
          <path {...p} d="M12 17.5V21" />
          <path {...p} d="M8.5 21h7" />
        </svg>
      );
    case "send":
      return (
        <svg {...box}>
          <path {...p} d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" />
          <path {...p} d="M12.5 13 21 3" />
        </svg>
      );
    case "close":
      return (
        <svg {...box}>
          <path {...p} d="M5 5l14 14" />
          <path {...p} d="M19 5 5 19" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...box}>
          <path {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
          <circle cx="12" cy="12" r="2.4" fill={color} stroke="none" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...box}>
          <path {...p} d="M5 12h14" />
          <path {...p} d="M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
};

/* ---------------- الشعار (الصورة الحقيقية المرفوعة) ---------------- */
const Logo = ({ dark = true, small = false }) => {
  const { t } = useLang();
  const s = small ? 40 : 52;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <img
        src={LOGO_DATA_URI}
        alt={t.hero.captionImg}
        style={{ width: s, height: s, objectFit: "contain", flexShrink: 0 }}
      />
      <div style={{ lineHeight: 1.15, textAlign: t.dir === "rtl" ? "right" : "left" }}>
        <div style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: small ? 15 : 18, color: dark ? C.paper : C.ink }}>
          {t.hero.captionImg}
        </div>
        <div style={{ fontFamily: "Tajawal", fontWeight: 500, fontSize: 10.5, letterSpacing: 2, color: dark ? "#9FB0AC" : C.muted }}>
          UAE DEAF ASSOCIATION
        </div>
      </div>
    </div>
  );
};

/* ---------------- شريط ترجمة/تسميات متحركة ---------------- */
const CaptionTicker = () => {
  const { t } = useLang();
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setI((v) => (v + 1) % t.captions.length), 3400);
    return () => clearInterval(timer);
  }, [t]);
  return (
    <div style={{ background: C.ink, borderTop: `1px solid ${C.inkSofter}`, borderBottom: `1px solid ${C.inkSofter}`, padding: "12px 0", overflow: "hidden" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: C.emeraldLight, display: "inline-block", flexShrink: 0, animation: "pulseDot 1.6s ease-in-out infinite" }} />
        <span key={i} style={{ fontFamily: "Tajawal", fontWeight: 500, fontSize: 14.5, color: "#D7E4DF", letterSpacing: 0.2, animation: "captionIn .5s ease" }}>
          {t.captions[i]}
        </span>
      </div>
    </div>
  );
};

/* ---------------- شريط علوي صغير ---------------- */
const TopUtilityBar = () => {
  const { t, lang, setLang } = useLang();
  return (
    <div style={{ background: C.inkSoft, color: "#B9C6C2", fontFamily: "Tajawal", fontSize: 12.5 }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, paddingTop: 8, paddingBottom: 8 }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="phone" size={14} /> 800-DEAF (3323)</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="mail" size={14} /> info@uaedeaf.ae</span>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span style={{ opacity: 0.85 }}>{t.topbar.addr}</span>
          <span style={{ width: 1, height: 12, background: "#3A4744" }} />
          <button type="button" onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={ghostBtnSm} title="Switch language / تبديل اللغة">
            {t.switchLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- التنقل الرئيسي ---------------- */
const NavBar = ({ navigate }) => {
  const { t } = useLang();
  const NAV = buildNav(t);
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const closeTimer = useRef(null);

  const enter = (key) => { clearTimeout(closeTimer.current); setOpen(key); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(null), 150); };

  const handleNavClick = (item) => {
    if (item.children) {
      setOpen((cur) => (cur === item.key ? null : item.key));
    } else {
      navigate(item.key);
      setOpen(null);
    }
  };

  const handleChildClick = (item, idx) => {
    if (item.key === "services" && item.serviceIdx) {
      navigate("services", { openService: item.serviceIdx[idx] });
    } else if (item.anchors) {
      navigate(item.key, { anchor: item.anchors[idx] });
    } else {
      navigate(item.key);
    }
    setOpen(null);
    setMobileOpen(false);
    setMobileSub(null);
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest || !e.target.closest("[data-navroot]")) setOpen(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div style={{ background: C.ink, position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 18px rgba(0,0,0,0.18)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, paddingBottom: 14 }}>
        <div style={{ cursor: "pointer" }} onClick={() => navigate("home")}>
          <Logo />
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="desktop-nav" data-navroot>
          {NAV.map((item) => (
            <div key={item.key} onMouseEnter={() => item.children && enter(item.key)} onMouseLeave={() => item.children && leave()} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => handleNavClick(item)}
                aria-expanded={item.children ? open === item.key : undefined}
                aria-haspopup={item.children ? "true" : undefined}
                style={{
                  background: "transparent", border: "none",
                  color: open === item.key ? C.emeraldLight : "#E9EDEB",
                  fontFamily: "Tajawal", fontWeight: 500, fontSize: 14.5,
                  padding: "10px 12px", cursor: "pointer", display: "flex",
                  alignItems: "center", gap: 5, position: "relative",
                  transition: "color .2s", whiteSpace: "nowrap",
                }}
              >
                {item.badge && (
                  <span style={{ position: "absolute", top: -2, insetInlineEnd: -6, background: C.crimson, color: "#fff", fontSize: 9, fontFamily: "Tajawal", fontWeight: 700, padding: "1.5px 5px", borderRadius: 6 }}>
                    {item.badge}
                  </span>
                )}
                {item.label}
                {item.children && (
                  <span style={{ transform: open === item.key ? "rotate(180deg)" : "none", transition: "transform .2s", display: "flex" }}>
                    <Icon name="chevron" size={13} />
                  </span>
                )}
              </button>

              {item.children && open === item.key && (
                <div style={{ position: "absolute", top: "100%", insetInlineEnd: 0, minWidth: 260, background: C.paper, borderRadius: 12, boxShadow: "0 18px 40px rgba(0,0,0,0.22)", overflow: "hidden", border: `1px solid ${C.line}`, animation: "dropdownIn .18s ease" }}>
                  {item.children.map((c, idx) => (
                    <a
                      key={idx}
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleChildClick(item, idx); }}
                      style={{ display: "block", padding: "13px 18px", fontFamily: "Tajawal", fontSize: 14, color: C.text, textDecoration: "none", borderBottom: idx !== item.children.length - 1 ? `1px solid ${C.sandDark}` : "none", transition: "background .15s, color .15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = C.emeraldPale; e.currentTarget.style.color = C.emerald; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.text; }}
                    >
                      {c}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          style={{ display: "none", background: C.inkSoft, border: `1px solid ${C.inkSofter}`, borderRadius: 10, width: 40, height: 40, color: "#fff", fontSize: 18, cursor: "pointer" }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu" style={{ background: C.inkSoft, padding: "6px 16px 16px", display: "none" }}>
          {NAV.map((item) => (
            <div key={item.key} style={{ borderBottom: `1px solid ${C.inkSofter}` }}>
              <button
                type="button"
                onClick={() => {
                  if (item.children) {
                    setMobileSub(mobileSub === item.key ? null : item.key);
                  } else {
                    navigate(item.key);
                    setMobileOpen(false);
                  }
                }}
                style={{ width: "100%", background: "transparent", border: "none", color: "#E9EDEB", fontFamily: "Tajawal", fontSize: 15, padding: "13px 4px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              >
                <span>{item.label}</span>
                {item.children && <span style={{ transform: mobileSub === item.key ? "rotate(180deg)" : "none" }}><Icon name="chevron" size={14} color="#9FB0AC" /></span>}
              </button>
              {item.children && mobileSub === item.key && (
                <div style={{ paddingBottom: 8 }}>
                  {item.children.map((c, idx) => (
                    <a key={idx} href="#" onClick={(e) => { e.preventDefault(); handleChildClick(item, idx); }} style={{ display: "block", padding: "9px 14px", fontFamily: "Tajawal", fontSize: 13.5, color: "#B9C6C2", textDecoration: "none" }}>
                      ‹ {c}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- الهيرو ---------------- */
const Hero = ({ navigate }) => {
  const { t } = useLang();
  return (
    <section id="home" style={{ background: `radial-gradient(1200px 500px at 85% -10%, #1E3E33 0%, ${C.ink} 55%)`, color: C.paper, position: "relative", overflow: "hidden" }}>
      <div className="container" style={{ paddingTop: "clamp(56px, 11vw, 96px)", paddingBottom: "clamp(56px, 11vw, 96px)", position: "relative", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 480px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(23,168,118,0.14)", border: `1px solid ${C.emeraldLight}55`, color: C.emeraldLight, padding: "7px 16px", borderRadius: 99, fontFamily: "Tajawal", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            <Icon name="hand" size={16} color={C.emeraldLight} /> {t.hero.kicker}
          </div>
          <h1 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(32px, 4.4vw, 52px)", lineHeight: 1.28, margin: "0 0 22px" }}>
            {t.hero.titleA} <span style={{ color: C.emeraldLight }}>{t.hero.titleB}</span>
          </h1>
          <p style={{ fontFamily: "Tajawal", fontWeight: 400, fontSize: 17, lineHeight: 1.9, color: "#C7D3CF", maxWidth: 560, margin: "0 0 34px" }}>
            {t.hero.desc}
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button type="button" style={primaryBtn} onClick={() => navigate("services")}>{t.hero.ctaPrimary}</button>
            <button type="button" style={outlineBtn} onClick={() => navigate("about")}>{t.hero.ctaSecondary}</button>
          </div>
        </div>

        <div style={{ flex: "1 1 340px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 380, aspectRatio: "1/1", borderRadius: 28, background: `linear-gradient(155deg, ${C.emerald}, ${C.ink} 70%)`, border: `1px solid ${C.inkSofter}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}>
            <img src={LOGO_DATA_URI} alt={t.hero.captionImg} style={{ width: "48%", height: "48%", objectFit: "contain", filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.35))" }} />
            <span style={{ position: "absolute", bottom: 22, background: "rgba(18,24,26,0.55)", backdropFilter: "blur(6px)", padding: "9px 18px", borderRadius: 99, color: "#EAF4EF", fontFamily: "Tajawal", fontSize: 13, border: "1px solid rgba(255,255,255,0.15)" }}>
              {t.hero.captionImg}
            </span>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.inkSofter}`, position: "relative" }}>
        <div className="container" style={{ paddingTop: 30, paddingBottom: 30, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 20, textAlign: "center" }}>
          {t.stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: 30, color: C.emeraldLight }}>{s.n}</div>
              <div style={{ fontFamily: "Tajawal", fontSize: 13.5, color: "#9FB0AC", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- عنوان قسم ---------------- */
const SectionHead = ({ eyebrow, title, desc, dark }) => (
  <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 46px" }}>
    <div style={{ display: "inline-block", fontFamily: "Tajawal", fontWeight: 700, fontSize: 12.5, letterSpacing: 1, color: C.crimson, background: C.crimsonPale, padding: "5px 14px", borderRadius: 99, marginBottom: 14 }}>
      {eyebrow}
    </div>
    <h2 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(24px, 3vw, 32px)", color: dark ? C.paper : C.text, margin: "0 0 12px" }}>{title}</h2>
    {desc && <p style={{ fontFamily: "Tajawal", fontSize: 15, lineHeight: 1.85, color: dark ? "#9FB0AC" : C.muted, margin: 0 }}>{desc}</p>}
  </div>
);

/* ---------------- شريط الرجوع للرئيسية (لكل صفحة داخلية) ---------------- */
const PageTopBanner = ({ navigate }) => {
  const { t } = useLang();
  return (
    <div style={{ background: C.ink, padding: "16px 0" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button type="button" onClick={() => navigate("home")} style={{ ...ghostBtnSm, display: "flex", alignItems: "center", gap: 6, color: "#E9EDEB" }}>
          <Icon name="arrow" size={15} /> {t.common.back}
        </button>
      </div>
    </div>
  );
};

/* ---------------- الصفحة الرئيسية: بطاقات استكشاف ---------------- */
const HomeExplore = ({ navigate }) => {
  const { t } = useLang();
  return (
    <section className="section" style={{ background: C.sand }}>
      <div className="container">
        <SectionHead eyebrow={t.homeExplore.eyebrow} title={t.homeExplore.title} desc={t.homeExplore.desc} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {t.homeExplore.cards.map((c, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => navigate(c.key)}
              onKeyDown={(e) => (e.key === "Enter" ? navigate(c.key) : null)}
              style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 16, padding: "24px 22px", cursor: "pointer", transition: "transform .2s, box-shadow .2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(14,124,90,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <h3 style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 16, color: C.text, margin: "0 0 8px" }}>{c.t}</h3>
              <p style={{ fontFamily: "Tajawal", fontSize: 13, color: C.muted, margin: "0 0 14px" }}>{c.d}</p>
              <span style={{ fontFamily: "Tajawal", fontWeight: 700, fontSize: 13, color: C.emerald, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="arrow" size={14} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- الخدمات الذكية ---------------- */
const Services = ({ onOpen }) => {
  const { t } = useLang();
  return (
    <section id="services" className="section" style={{ background: C.sand }}>
      <div className="container">
        <SectionHead eyebrow={t.sectionEyebrow.services} title={t.services.title} desc={t.services.desc} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 22 }}>
          {t.services.list.map((s, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => onOpen(i)}
              onKeyDown={(e) => (e.key === "Enter" ? onOpen(i) : null)}
              style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 18, padding: "30px 26px", transition: "transform .25s, box-shadow .25s", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(14,124,90,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: C.emeraldPale, display: "flex", alignItems: "center", justifyContent: "center", color: C.emerald, marginBottom: 20 }}>
                <Icon name={s.i} size={24} />
              </div>
              <h3 style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 17, color: C.text, margin: "0 0 10px" }}>{s.t}</h3>
              <p style={{ fontFamily: "Tajawal", fontSize: 13.8, lineHeight: 1.8, color: C.muted, margin: "0 0 18px" }}>{s.d}</p>
              <span style={{ fontFamily: "Tajawal", fontWeight: 700, fontSize: 13.5, color: C.emerald, display: "flex", alignItems: "center", gap: 6 }}>
                {t.services.startNow} <span style={{ transform: t.dir === "rtl" ? "rotate(90deg)" : "rotate(-90deg)", display: "flex" }}><Icon name="chevron" size={13} /></span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- عن الجمعية (صفحة كاملة) ---------------- */
const AboutPage = () => {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="about" className="section" style={{ background: C.paper }}>
      <div className="container">
        <SectionHead eyebrow={t.sectionEyebrow.about} title={a.title} desc={a.desc} />

        <div id="about-intro" style={{ marginBottom: 44, scrollMarginTop: 90 }}>
          <h3 style={sectionSubTitle}><Icon name="hand" size={18} color={C.emerald} /> {a.introTitle}</h3>
          <p style={sectionParagraph}>{a.intro}</p>
        </div>

        <div id="about-vision" style={{ marginBottom: 44, scrollMarginTop: 90 }}>
          <h3 style={sectionSubTitle}><Icon name="eye" size={18} color={C.emerald} /> {a.visionTitle}</h3>
          <p style={sectionParagraph}>{a.visionText}</p>
        </div>

        <div id="about-goals" style={{ marginBottom: 44, scrollMarginTop: 90 }}>
          <h3 style={sectionSubTitle}><Icon name="target" size={18} color={C.emerald} /> {a.goalsTitle}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 14 }}>
            {a.goals.map((g, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: C.sand, borderRadius: 12, padding: "14px 16px" }}>
                <span style={{ width: 24, height: 24, borderRadius: 99, background: C.emerald, color: "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Tajawal", fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
                <span style={{ fontFamily: "Tajawal", fontSize: 13.8, color: C.text, lineHeight: 1.7 }}>{g}</span>
              </div>
            ))}
          </div>
        </div>

        <div id="about-chairman" style={{ marginBottom: 44, scrollMarginTop: 90 }}>
          <h3 style={sectionSubTitle}><Icon name="chat" size={18} color={C.emerald} /> {a.chairmanTitle}</h3>
          <div style={{ borderRadius: 20, background: `linear-gradient(160deg, ${C.emeraldPale}, ${C.sand})`, border: `1px solid ${C.line}`, padding: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div style={{ width: 54, height: 54, borderRadius: 99, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", color: C.emeraldLight, fontFamily: "Almarai", fontWeight: 800 }}>
                {t.dir === "rtl" ? "رئ" : "CH"}
              </div>
              <div style={{ fontFamily: "Tajawal", fontSize: 13, color: C.muted }}>{a.chairmanSub}</div>
            </div>
            <p style={{ fontFamily: "Tajawal", fontSize: 14.5, lineHeight: 1.95, color: "#3A4340", margin: 0 }}>«{a.chairmanQuote}»</p>
          </div>
        </div>

        <div id="about-board" style={{ marginBottom: 44, scrollMarginTop: 90 }}>
          <h3 style={sectionSubTitle}><Icon name="hand" size={18} color={C.emerald} /> {a.boardTitle}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 14 }}>
            {a.board.map((b, i) => (
              <div key={i} style={{ background: C.sand, borderRadius: 14, padding: "18px 20px", border: `1px solid ${C.line}` }}>
                <div style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 14.5, color: C.text }}>{b.n}</div>
                <div style={{ fontFamily: "Tajawal", fontSize: 12.5, color: C.emerald, marginTop: 4 }}>{b.r}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="about-plans" style={{ scrollMarginTop: 90 }}>
          <h3 style={sectionSubTitle}><Icon name="renew" size={18} color={C.emerald} /> {a.plansTitle}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {a.plans.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: C.sand, borderRadius: 14, padding: "18px 20px", border: `1px solid ${C.line}` }}>
                <div style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 14.5, color: C.text, minWidth: 200 }}>{p.t}</div>
                <div style={{ fontFamily: "Tajawal", fontSize: 13.5, color: C.muted, lineHeight: 1.8 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- الأخبار (صفحة كاملة) ---------------- */
const NewsPage = () => {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section id="news" className="section" style={{ background: C.sand }}>
      <div className="container">
        <SectionHead eyebrow={t.sectionEyebrow.news} title={t.news.title} desc={t.news.desc} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {t.news.list.map((n, i) => (
            <article key={i} style={{ background: C.paper, borderRadius: 18, overflow: "hidden", border: `1px solid ${C.line}` }}>
              <div style={{ height: 150, background: `linear-gradient(135deg, ${[C.emerald, C.crimson, C.gold][i % 3]}, ${C.ink})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="wave" size={40} color="rgba(255,255,255,0.85)" />
              </div>
              <div style={{ padding: "22px 22px 26px" }}>
                <span style={{ fontFamily: "Tajawal", fontSize: 11.5, fontWeight: 700, color: C.emerald }}>{n.tag}</span>
                <h3 style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 16.5, color: C.text, margin: "10px 0 12px", lineHeight: 1.6 }}>{n.t}</h3>
                <span style={{ fontFamily: "Tajawal", fontSize: 12.5, color: C.muted }}>{n.d}</span>
                {openIdx === i && <p style={{ fontFamily: "Tajawal", fontSize: 13.3, color: C.text, lineHeight: 1.85, marginTop: 14 }}>{n.body}</p>}
                <div>
                  <button type="button" onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ ...outlineBtnSm, marginTop: 16 }}>
                    {openIdx === i ? t.services.overlay.close : t.news.readMore}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- الفعاليات (صفحة كاملة) ---------------- */
const EventsPage = ({ navigate }) => {
  const { t } = useLang();
  const internalList = t.events.list.filter((e) => e.type === "داخلية" || e.type === "internal");
  const externalList = t.events.list.filter((e) => e.type === "خارجية" || e.type === "external");

  const Row = ({ e }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", background: C.sand, border: `1px solid ${C.line}`, borderRadius: 16, padding: "20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ minWidth: 66, textAlign: "center", background: C.ink, color: C.emeraldLight, borderRadius: 12, padding: "10px 8px", fontFamily: "Almarai", fontWeight: 700, fontSize: 13.5 }}>{e.d}</div>
        <div>
          <div style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 15.5, color: C.text }}>{e.t}</div>
          <div style={{ fontFamily: "Tajawal", fontSize: 13, color: C.muted, display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <Icon name="pin" size={14} color={C.muted} /> {e.loc}
          </div>
        </div>
      </div>
      <button type="button" style={outlineBtnSm} onClick={() => navigate("contact")}>{t.events.details}</button>
    </div>
  );

  return (
    <section id="events" className="section" style={{ background: C.paper }}>
      <div className="container">
        <SectionHead eyebrow={t.sectionEyebrow.events} title={t.events.title} desc={t.events.desc} />

        <div id="events-internal" style={{ marginBottom: 34, scrollMarginTop: 90 }}>
          <h3 style={sectionSubTitle}><Icon name="pin" size={18} color={C.emerald} /> {t.events.internal}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {internalList.map((e, i) => <Row key={i} e={e} />)}
          </div>
        </div>

        <div id="events-external" style={{ scrollMarginTop: 90 }}>
          <h3 style={sectionSubTitle}><Icon name="pin" size={18} color={C.emerald} /> {t.events.external}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {externalList.map((e, i) => <Row key={i} e={e} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- أسبوع الأصم العربي / خطبة الجمعة ---------------- */
const FeaturePage = ({ data, color, icon, navigate, targetPage }) => (
  <section className="section" style={{ background: C.sand }}>
    <div className="container">
      <div style={{ borderRadius: 22, padding: "clamp(28px,6vw,44px)", background: `linear-gradient(150deg, ${color}, #10201b)`, color: "#fff" }}>
        <div style={{ fontFamily: "Tajawal", fontSize: 12.5, opacity: 0.85, marginBottom: 10 }}>{data.kicker}</div>
        <h1 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: "clamp(24px,3vw,32px)", margin: "0 0 18px" }}>{data.title}</h1>
        <p style={{ fontFamily: "Tajawal", fontSize: 15, lineHeight: 1.95, opacity: 0.94, marginBottom: 26, maxWidth: 680 }}>{data.body}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 12, marginBottom: 28 }}>
          {data.points.map((p, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", fontFamily: "Tajawal", fontSize: 13.5, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon name={icon} size={17} color="#fff" /> {p}
            </div>
          ))}
        </div>
        <button type="button" style={{ ...outlineBtn, borderColor: "#fff", color: "#fff" }} onClick={() => navigate(targetPage)}>{data.cta}</button>
      </div>
    </div>
  </section>
);

/* ---------------- معرض الصور ---------------- */
const GALLERY_COLORS = [C.emerald, C.crimson, C.gold, C.inkSofter, C.emeraldLight, "#8A9A46"];
const GalleryPage = () => {
  const { t } = useLang();
  return (
    <section id="gallery" className="section" style={{ background: C.paper }}>
      <div className="container">
        <SectionHead eyebrow={t.sectionEyebrow.gallery} title={t.gallery.title} desc={t.gallery.desc} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
          {GALLERY_COLORS.map((color, i) => (
            <div
              key={i}
              style={{ aspectRatio: "1/1", borderRadius: 16, background: `linear-gradient(160deg, ${color}, ${C.ink})`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform .25s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Icon name="hand" size={26} color="rgba(255,255,255,0.75)" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- نموذج التواصل ---------------- */
const ContactForm = () => {
  const { t } = useLang();
  const [values, setValues] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const update = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!values.name || !values.message) return;
    setSent(true);
    setValues({ name: "", phone: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 14 }} onSubmit={submit}>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <input required placeholder={t.contact.formName} value={values.name} onChange={update("name")} style={{ ...inputStyle, flex: "1 1 160px" }} />
        <input placeholder={t.contact.formPhone} value={values.phone} onChange={update("phone")} style={{ ...inputStyle, flex: "1 1 160px" }} />
      </div>
      <input type="email" placeholder={t.contact.formEmail} value={values.email} onChange={update("email")} style={inputStyle} />
      <textarea required placeholder={t.contact.formMsg} rows={5} value={values.message} onChange={update("message")} style={{ ...inputStyle, resize: "none", fontFamily: "Tajawal" }} />
      <button type="submit" style={{ ...primaryBtn, alignSelf: "flex-start" }}>{t.contact.send}</button>
      {sent && (
        <div style={{ fontFamily: "Tajawal", fontSize: 13.5, color: C.emeraldLight, background: "rgba(23,168,118,0.12)", border: `1px solid ${C.emeraldLight}55`, borderRadius: 10, padding: "10px 16px" }}>
          {t.contact.sent}
        </div>
      )}
    </form>
  );
};

/* ---------------- اتصل بنا (صفحة كاملة) ---------------- */
const ContactPage = () => {
  const { t } = useLang();
  return (
    <section id="contact" className="section" style={{ background: C.ink, color: "#fff" }}>
      <div className="container" style={{ display: "flex", gap: 50, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 320px" }}>
          <SectionHead eyebrow={t.sectionEyebrow.contact} title={t.contact.title} dark />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { i: "pin", t: t.contact.hq, d: t.contact.hqVal },
              { i: "phone", t: t.contact.hotline, d: "800-DEAF (3323)" },
              { i: "mail", t: t.contact.emailLabel, d: "info@uaedeaf.ae" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: C.inkSoft, display: "flex", alignItems: "center", justifyContent: "center", color: C.emeraldLight, flexShrink: 0 }}>
                  <Icon name={c.i} size={19} />
                </div>
                <div>
                  <div style={{ fontFamily: "Almarai", fontWeight: 700, fontSize: 14.5 }}>{c.t}</div>
                  <div style={{ fontFamily: "Tajawal", fontSize: 13.5, color: "#9FB0AC", marginTop: 3 }}>{c.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

/* ---------------- صفحة تفاصيل الخدمة ---------------- */
const ServiceOverlay = ({ service, onClose }) => {
  const { t } = useLang();
  const [started, setStarted] = useState(false);
  const ov = t.services.overlay;

  return (
    <div style={{ position: "fixed", inset: 0, background: C.sand, zIndex: 100, overflowY: "auto", animation: "overlayIn .22s ease" }}>
      <div style={{ background: C.ink, padding: "16px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo small />
          <button type="button" onClick={onClose} style={{ ...ghostBtnSm, display: "flex", alignItems: "center", gap: 6, color: "#E9EDEB" }}>
            <Icon name="close" size={15} /> {ov.close}
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "clamp(28px,5vw,44px)", paddingBottom: 60 }}>
        <div style={{ background: "#EDEDED", border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
          <h1 style={{ fontFamily: "Almarai", fontWeight: 800, fontSize: 20, color: C.text, margin: 0 }}>{service.t}</h1>
        </div>

        <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
          <button type="button" onClick={onClose} style={{ background: "transparent", border: "none", color: C.crimson, fontFamily: "Tajawal", fontWeight: 700, fontSize: 14, cursor: "pointer", padding: 0 }}>
            {ov.back}
          </button>
          <div style={{ fontFamily: "Tajawal", fontSize: 14.5, color: C.text }}>
            {ov.code} <span style={{ color: C.crimson, fontWeight: 700 }}>{service.code}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 18 }}>
          <button
            type="button"
            onClick={() => setStarted(true)}
            style={{ background: started ? C.emeraldPale : "#EDEDED", border: `1px solid ${started ? C.emeraldLight : C.line}`, borderRadius: 14, padding: "26px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "start" }}
          >
            <div style={{ width: 48, height: 48, borderRadius: 99, background: started ? C.emerald : "#6b6b6b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
              <Icon name="renew" size={22} color="#fff" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "Tajawal", fontWeight: 700, fontSize: 16, color: C.text }}>{started ? ov.running : ov.start}</span>
              <span style={{ color: started ? C.emerald : C.crimson, display: "flex" }}>
                {started ? (
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M8 12.5l2.4 2.4L16 9" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </span>
            </div>
          </button>

          <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14, padding: "26px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ width: 48, height: 48, borderRadius: 99, background: "#6b6b6b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
              <Icon name="renew" size={22} color="#fff" />
            </div>
            <div style={{ textAlign: "end" }}>
              <div style={{ fontFamily: "Tajawal", fontWeight: 700, fontSize: 16, color: C.text }}>{ov.fee}</div>
              <div style={{ fontFamily: "Tajawal", fontWeight: 700, fontSize: 15, color: C.crimson, marginTop: 4 }}>
                {service.fee > 0 ? `${service.fee} ${t.dir === "rtl" ? "درهم" : "AED"}` : ov.free}
              </div>
            </div>
          </div>
        </div>

        {started && (
          <div style={{ marginTop: 22, background: C.emeraldPale, border: `1px solid ${C.emeraldLight}66`, borderRadius: 12, padding: "16px 22px", fontFamily: "Tajawal", fontSize: 14, color: "#0B4A38", display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="renew" size={18} color={C.emerald} />
            {ov.success}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- الفوتر ---------------- */
const Footer = ({ navigate }) => {
  const { t } = useLang();
  return (
    <footer style={{ background: C.inkSoft, paddingTop: "clamp(36px,7vw,50px)", paddingBottom: "clamp(20px,4vw,26px)", paddingInline: "clamp(16px,5vw,48px)", color: "#9FB0AC" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 30, paddingBottom: 30, borderBottom: `1px solid ${C.inkSofter}` }}>
        <div style={{ cursor: "pointer" }} onClick={() => navigate("home")}>
          <Logo />
        </div>
        <div style={{ display: "flex", gap: 46, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "Almarai", fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 14 }}>{t.footer.quickLinks}</div>
            {[
              { l: t.nav.about, id: "about" },
              { l: t.nav.services, id: "services" },
              { l: t.nav.news, id: "news" },
              { l: t.nav.contact, id: "contact" },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => navigate(item.id)}
                style={{ fontFamily: "Tajawal", fontSize: 13.5, marginBottom: 10, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9FB0AC")}
              >
                {item.l}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "Almarai", fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 14 }}>{t.footer.follow}</div>
            {["Instagram", "X (Twitter)", "YouTube"].map((l, i) => (
              <div key={i} style={{ fontFamily: "Tajawal", fontSize: 13.5, marginBottom: 10 }}>{l}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 22, textAlign: "center", fontFamily: "Tajawal", fontSize: 12.5 }}>
        © {new Date().getFullYear()} {t.hero.captionImg} — {t.footer.rights}
      </div>
    </footer>
  );
};

/* ---------------- تهجئة الكلمة الأخيرة بلغة الإشارة ---------------- */
const AR_LETTERS = "ابتثجحخدذرزسشصضطظعغفقكلمنهوياىءآأؤإئة".split("");
const EN_LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const FingerspellRow = ({ word, lang }) => {
  const { t } = useLang();
  const alphabet = lang === "ar" ? AR_LETTERS : EN_LETTERS;
  const letters = (word || "").toLowerCase().split("").filter((ch) => alphabet.includes(ch));
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    if (letters.length < 2) return;
    const timer = setInterval(() => setActive((v) => (v + 1) % letters.length), 550);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [word]);

  if (!letters.length) {
    return <div style={{ fontFamily: "Tajawal", fontSize: 12.5, color: "#8FA39D", textAlign: "center", padding: "10px 0" }}>{t.sign.fingerspellEmpty}</div>;
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", padding: "10px 4px" }}>
      {letters.map((ch, i) => (
        <div
          key={i}
          style={{
            width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Almarai", fontWeight: 800, fontSize: 15,
            background: i === active ? C.emerald : "rgba(255,255,255,0.08)",
            color: i === active ? "#fff" : "#B9C6C2",
            transform: i === active ? "translateY(-4px) scale(1.08)" : "none",
            transition: "all .25s",
            border: i === active ? `1px solid ${C.emeraldLight}` : "1px solid rgba(255,255,255,0.12)",
            textTransform: "uppercase",
          }}
        >
          {ch}
        </div>
      ))}
    </div>
  );
};

/* ---------------- تواصل بلغة الإشارة (يعمل بالصوت أو بالكتابة) ---------------- */
const SignLanguageWidget = () => {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [micError, setMicError] = useState("");
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [typed, setTyped] = useState("");
  const [lastWord, setLastWord] = useState("");
  const recRef = useRef(null);

  useEffect(() => {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) {
      setSupported(false);
      return;
    }
    try {
      const rec = new SR();
      rec.lang = lang === "ar" ? "ar-AE" : "en-US";
      rec.continuous = true;
      rec.interimResults = true;

      rec.onresult = (event) => {
        let finalText = "";
        let interimText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const tx = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalText += tx;
          else interimText += tx;
        }
        if (finalText.trim()) {
          setTranscript((prev) => (prev ? prev + " " + finalText.trim() : finalText.trim()));
          const words = finalText.trim().split(/\s+/);
          setLastWord(words[words.length - 1] || "");
        }
        setInterim(interimText);
      };
      rec.onerror = (e) => {
        setListening(false);
        if (e && e.error === "not-allowed") setMicError(t.sign.micDenied);
      };
      rec.onend = () => setListening(false);
      recRef.current = rec;
    } catch (err) {
      setSupported(false);
    }

    return () => {
      try { recRef.current && recRef.current.stop(); } catch (e) {}
    };
    // eslint-disable-next-line
  }, [lang]);

  const toggleListening = () => {
    if (!recRef.current) {
      setMicError(t.sign.micUnsupported);
      return;
    }
    if (listening) {
      recRef.current.stop();
      setListening(false);
    } else {
      setMicError("");
      setTranscript("");
      setInterim("");
      try {
        recRef.current.start();
        setListening(true);
      } catch (e) {
        setMicError(t.sign.micUnsupported);
      }
    }
  };

  const onTypeChange = (e) => {
    const val = e.target.value;
    setTyped(val);
    const words = val.trim().split(/\s+/);
    setLastWord(words[words.length - 1] || "");
  };

  return (
    <div style={{ position: "fixed", insetInlineStart: 22, bottom: 22, zIndex: 60 }}>
      {open && (
        <div style={{ position: "absolute", bottom: 66, insetInlineStart: 0, width: "min(340px, 88vw)", background: C.ink, border: `1px solid ${C.inkSofter}`, borderRadius: 18, boxShadow: "0 24px 60px rgba(0,0,0,0.45)", overflow: "hidden", animation: "panelIn .2s ease" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${C.inkSofter}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontFamily: "Almarai", fontWeight: 700, fontSize: 14 }}>
              <Icon name="hand" size={17} color={C.emeraldLight} /> {t.sign.title}
            </div>
            <button type="button" onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: "#9FB0AC", cursor: "pointer" }}>
              <Icon name="close" size={16} />
            </button>
          </div>

          <div style={{ padding: "16px" }}>
            <button
              type="button"
              onClick={toggleListening}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: listening ? C.crimson : C.emerald, color: "#fff", border: "none", borderRadius: 12,
                padding: "12px 16px", fontFamily: "Tajawal", fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 10,
              }}
            >
              <Icon name="mic" size={17} />
              {listening ? t.sign.stopListen : t.sign.startListen}
              {listening && <span style={{ width: 8, height: 8, borderRadius: 99, background: "#fff", animation: "pulseDot 1s ease-in-out infinite" }} />}
            </button>

            {(!supported || micError) && (
              <div style={{ fontFamily: "Tajawal", fontSize: 12, color: "#E4B3B7", lineHeight: 1.8, marginBottom: 10 }}>
                {micError || t.sign.micUnsupported}
              </div>
            )}

            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 14px", minHeight: 46, fontFamily: "Tajawal", fontSize: 14, color: "#E9EDEB", lineHeight: 1.8, marginBottom: 14 }}>
              {transcript || interim ? (<>{transcript} <span style={{ color: "#7C8B87" }}>{interim}</span></>) : (<span style={{ color: "#7C8B87" }}>{t.sign.placeholderText}</span>)}
            </div>

            <div style={{ fontFamily: "Tajawal", fontSize: 11.5, color: "#9FB0AC", marginBottom: 6 }}>{t.sign.typeLabel}</div>
            <input
              value={typed}
              onChange={onTypeChange}
              placeholder={t.sign.typePlaceholder}
              style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: `1px solid ${C.inkSofter}`, borderRadius: 10, padding: "10px 12px", color: "#fff", fontFamily: "Tajawal", fontSize: 13.5, outline: "none", marginBottom: 14 }}
            />

            <div style={{ borderTop: `1px solid ${C.inkSofter}`, paddingTop: 8 }}>
              <div style={{ fontFamily: "Tajawal", fontSize: 11.5, color: "#7C8B87", textAlign: "center", marginBottom: 4 }}>{t.sign.fingerspellTitle}</div>
              <FingerspellRow word={lastWord} lang={lang} />
            </div>
            <div style={{ fontFamily: "Tajawal", fontSize: 10.5, color: "#5F6F6A", textAlign: "center", marginTop: 6 }}>{t.sign.note}</div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{ display: "flex", alignItems: "center", gap: 10, background: C.emerald, color: "#fff", border: "none", borderRadius: 99, padding: "13px 20px", fontFamily: "Tajawal", fontWeight: 700, fontSize: 13.5, cursor: "pointer", boxShadow: "0 12px 30px rgba(14,124,90,0.4)", position: "relative" }}
      >
        <span style={{ position: "absolute", inset: -4, borderRadius: 99, border: `2px solid ${C.emeraldLight}`, animation: "ring 1.8s ease-out infinite" }} />
        <Icon name={open ? "close" : "hand"} size={18} /> {t.sign.floating}
      </button>
    </div>
  );
};

/* ---------------- المساعد الذكي ---------------- */
const AiBot = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: t.bot.hello }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => { setMessages([{ from: "bot", text: t.bot.hello }]); }, [t]);
  useEffect(() => { if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight; }, [messages, typing]);

  const findAnswer = (msg) => {
    const clean = msg.trim().toLowerCase();
    for (const item of t.bot.faq) {
      if (item.k.some((kw) => clean.includes(kw.toLowerCase()))) return item.a;
    }
    return t.bot.fallback;
  };

  const send = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: findAnswer(text) }]);
      setTyping(false);
    }, 550);
  };

  return (
    <div style={{ position: "fixed", insetInlineEnd: 22, bottom: 22, zIndex: 60 }}>
      {open && (
        <div style={{ position: "absolute", bottom: 66, insetInlineEnd: 0, width: "min(350px, 88vw)", height: 440, background: C.paper, border: `1px solid ${C.line}`, borderRadius: 18, boxShadow: "0 24px 60px rgba(0,0,0,0.28)", overflow: "hidden", display: "flex", flexDirection: "column", animation: "panelIn .2s ease" }}>
          <div style={{ background: C.ink, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontFamily: "Almarai", fontWeight: 700, fontSize: 14 }}>
              <Icon name="sparkle" size={17} color={C.emeraldLight} /> {t.bot.title}
            </div>
            <button type="button" onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: "#9FB0AC", cursor: "pointer" }}>
              <Icon name="close" size={16} />
            </button>
          </div>

          <div ref={boxRef} style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10, background: C.sand }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === "bot" ? "flex-start" : "flex-end", maxWidth: "82%", background: m.from === "bot" ? C.paper : C.emerald, color: m.from === "bot" ? C.text : "#fff", border: m.from === "bot" ? `1px solid ${C.line}` : "none", borderRadius: 14, padding: "10px 14px", fontFamily: "Tajawal", fontSize: 13.5, lineHeight: 1.8 }}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div style={{ alignSelf: "flex-start", color: C.muted, fontFamily: "Tajawal", fontSize: 12.5, display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: C.muted, animation: "pulseDot 1s infinite" }} />
                <span style={{ width: 6, height: 6, borderRadius: 99, background: C.muted, animation: "pulseDot 1s .15s infinite" }} />
                <span style={{ width: 6, height: 6, borderRadius: 99, background: C.muted, animation: "pulseDot 1s .3s infinite" }} />
              </div>
            )}
          </div>

          <form onSubmit={send} style={{ display: "flex", gap: 8, padding: 12, borderTop: `1px solid ${C.line}`, background: C.paper }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.bot.placeholder} style={{ flex: 1, border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 14px", fontFamily: "Tajawal", fontSize: 13.5, outline: "none", color: C.text }} />
            <button type="submit" style={{ background: C.emerald, color: "#fff", border: "none", borderRadius: 10, width: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon name="send" size={17} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{ width: 58, height: 58, borderRadius: 99, background: C.ink, color: "#fff", border: `1px solid ${C.inkSofter}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 12px 30px rgba(0,0,0,0.35)" }}
        aria-label={t.bot.title}
      >
        <Icon name={open ? "close" : "chat"} size={22} color={C.emeraldLight} />
      </button>
    </div>
  );
};

/* ---------------- أنماط مشتركة ---------------- */
const primaryBtn = { background: C.emerald, color: "#fff", border: "none", padding: "14px 26px", borderRadius: 12, fontFamily: "Tajawal", fontWeight: 700, fontSize: 14.5, cursor: "pointer" };
const outlineBtn = { background: "transparent", color: "#fff", border: `1.5px solid #4A5A56`, padding: "14px 26px", borderRadius: 12, fontFamily: "Tajawal", fontWeight: 700, fontSize: 14.5, cursor: "pointer" };
const outlineBtnSm = { background: "transparent", color: C.emerald, border: `1.5px solid ${C.emerald}`, padding: "9px 18px", borderRadius: 10, fontFamily: "Tajawal", fontWeight: 700, fontSize: 13, cursor: "pointer" };
const ghostBtnSm = { background: "transparent", border: "none", color: "#B9C6C2", fontFamily: "Tajawal", fontWeight: 700, fontSize: 12, cursor: "pointer" };
const inputStyle = { background: C.inkSoft, border: `1px solid ${C.inkSofter}`, borderRadius: 12, padding: "13px 16px", color: "#fff", fontFamily: "Tajawal", fontSize: 14, outline: "none" };
const sectionSubTitle = { fontFamily: "Almarai", fontWeight: 700, fontSize: 18, color: C.text, display: "flex", alignItems: "center", gap: 10, margin: "0 0 16px" };
const sectionParagraph = { fontFamily: "Tajawal", fontSize: 14.5, lineHeight: 1.95, color: C.muted, margin: 0, maxWidth: 820 };

/* ---------------- التطبيق الرئيسي ---------------- */
export default function App() {
  const [lang, setLang] = useState("ar");
  const [page, setPage] = useState("home");
  const [activeService, setActiveService] = useState(null);
  const t = T[lang];

  const navigate = (key, opts) => {
    if (key === "services" && opts && typeof opts.openService === "number") {
      setPage("services");
      setActiveService(opts.openService);
      goTop();
      return;
    }
    setPage(key);
    if (opts && opts.anchor) {
      setTimeout(() => goToId(opts.anchor), 60);
    } else {
      setTimeout(goTop, 30);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("dir", t.dir);
    document.documentElement.setAttribute("lang", t.code);
  }, [t]);

  const NAVIGATE_TARGET_FOR_ARABWEEK = "events";
  const NAVIGATE_TARGET_FOR_SERMON = "contact";

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <div dir={t.dir} className="App" style={{ fontFamily: "Tajawal, sans-serif", background: C.paper, color: C.text, width: "100%", maxWidth: "100%", margin: 0, overflowX: "hidden" }}>
        <style>{`
          ${FONTS_IMPORT}
          html, body { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; }
          #root, #app, .App { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; text-align: initial !important; }
          html { overflow-x: hidden; }
          body { overflow-x: hidden; }
          * { box-sizing: border-box; }
          img, svg { max-width: 100%; display: block; }

          .container { width: 100%; max-width: 1240px; margin: 0 auto; padding-inline: clamp(16px, 5vw, 48px); }
          .section { width: 100%; padding-block: clamp(48px, 9vw, 90px); }

          ::selection { background: ${C.emerald}; color: #fff; }
          input::placeholder, textarea::placeholder { color: #7C8B87; }
          input:focus, textarea:focus { border-color: ${C.emeraldLight} !important; }

          @keyframes captionIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
          @keyframes pulseDot { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
          @keyframes dropdownIn { from { opacity: 0; transform: translateY(-6px);} to { opacity: 1; transform: translateY(0);} }
          @keyframes ring { 0% { opacity: .7; transform: scale(1);} 100% { opacity: 0; transform: scale(1.35);} }
          @keyframes overlayIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
          @keyframes panelIn { from { opacity: 0; transform: translateY(10px) scale(.98);} to { opacity: 1; transform: translateY(0) scale(1);} }

          a { text-decoration: none; }
          button { font-family: inherit; }
          button:focus-visible, a:focus-visible { outline: 2.5px solid ${C.emeraldLight}; outline-offset: 2px; }

          @media (max-width: 1180px) { .container { padding-inline: clamp(16px, 4vw, 36px); } }
          @media (max-width: 1024px) {
            .desktop-nav { display: none !important; }
            .mobile-toggle { display: flex !important; align-items:center; justify-content:center; }
            .mobile-menu { display: block !important; }
            .section { padding-block: clamp(40px, 8vw, 64px); }
          }
          @media (max-width: 768px) { .container { padding-inline: 18px; } .section { padding-block: 44px; } }
          @media (max-width: 420px) { .container { padding-inline: 14px; } .section { padding-block: 36px; } }
          @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
        `}</style>

        <TopUtilityBar />
        <NavBar navigate={navigate} />

        {page === "home" && (
          <>
            <Hero navigate={navigate} />
            <CaptionTicker />
            <HomeExplore navigate={navigate} />
          </>
        )}

        {page !== "home" && <PageTopBanner navigate={navigate} />}

        {page === "about" && <AboutPage />}
        {page === "services" && <Services onOpen={(i) => setActiveService(i)} />}
        {page === "news" && <NewsPage />}
        {page === "events" && <EventsPage navigate={navigate} />}
        {page === "arabweek" && <FeaturePage data={t.arabweek} color={C.crimson} icon="wave" navigate={navigate} targetPage={NAVIGATE_TARGET_FOR_ARABWEEK} />}
        {page === "sermon" && <FeaturePage data={t.sermon} color={C.emerald} icon="video" navigate={navigate} targetPage={NAVIGATE_TARGET_FOR_SERMON} />}
        {page === "gallery" && <GalleryPage />}
        {page === "contact" && <ContactPage />}

        <Footer navigate={navigate} />
        <SignLanguageWidget />
        <AiBot />

        {activeService !== null && (
          <ServiceOverlay service={t.services.list[activeService]} onClose={() => setActiveService(null)} />
        )}
      </div>
    </LangContext.Provider>
  );
}