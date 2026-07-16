import type { Language, MealTiming, TimingSlot } from "../types";

export const copy = {
  en: {
    appName: "DawaDoc",
    tagline: "Understand any prescription or medicine, instantly.",
    heroTitle: "Confused about a medicine or prescription?",
    heroSubtitle:
      "Take a photo of a doctor's prescription or a medicine strip. DawaDoc reads it and explains it in simple words — what it's for, when to take it, and what to watch out for.",
    uploadCta: "Upload a photo",
    cameraCta: "Take a photo",
    dropHint: "or drag and drop an image here",
    changePhoto: "Choose a different photo",
    analyzeCta: "Explain this medicine",
    loadingTitle: "Reading your prescription…",
    loadingSubtitle: "This usually takes a few seconds.",
    resultsTitle: "Here's what we found",
    unreadableTitle: "We couldn't read this clearly",
    unreadableHint: "Try a well-lit, close-up, in-focus photo of the prescription or strip.",
    retake: "Try another photo",
    readAloud: "Read aloud",
    stop: "Stop",
    purposeLabel: "What it's for",
    dosageLabel: "How to take it",
    timingLabel: "When to take it",
    sideEffectsLabel: "Watch out for",
    warningsLabel: "Important",
    generalNotesLabel: "Additional notes",
    confidenceLow: "We're not fully certain about this reading — please confirm with your pharmacist.",
    confidenceMedium: "Mostly clear, but double-check with your pharmacist if unsure.",
    disclaimer:
      "DawaDoc explains what's written on your prescription or medicine — it is not medical advice. Always confirm with your doctor or pharmacist before making any decisions.",
    errorGeneric: "Something went wrong. Please try again.",
    footerBuiltFor: "Built to help families read prescriptions together.",
  },
  hi: {
    appName: "दवाडॉक",
    tagline: "किसी भी पर्ची या दवा को तुरंत समझें।",
    heroTitle: "दवा या डॉक्टर की पर्ची समझ नहीं आ रही?",
    heroSubtitle:
      "डॉक्टर की पर्ची या दवा की पत्ती की फोटो लें। दवाडॉक उसे पढ़कर आसान भाषा में बताएगा — यह किस बीमारी के लिए है, कब लेनी है, और किन बातों का ध्यान रखना है।",
    uploadCta: "फोटो अपलोड करें",
    cameraCta: "फोटो लें",
    dropHint: "या यहाँ फोटो खींचकर छोड़ें",
    changePhoto: "दूसरी फोटो चुनें",
    analyzeCta: "यह दवा समझाएं",
    loadingTitle: "आपकी पर्ची पढ़ी जा रही है…",
    loadingSubtitle: "इसमें आमतौर पर कुछ ही पल लगते हैं।",
    resultsTitle: "यह रही जानकारी",
    unreadableTitle: "हम इसे साफ़ तरीके से नहीं पढ़ पाए",
    unreadableHint: "कृपया अच्छी रोशनी में, नज़दीक से और साफ़ फोटो लें।",
    retake: "दूसरी फोटो लें",
    readAloud: "ज़ोर से सुनाएं",
    stop: "रोकें",
    purposeLabel: "यह किस लिए है",
    dosageLabel: "कैसे लें",
    timingLabel: "कब लें",
    sideEffectsLabel: "इन बातों का ध्यान रखें",
    warningsLabel: "ज़रूरी सूचना",
    generalNotesLabel: "अन्य जानकारी",
    confidenceLow: "हमें पूरा भरोसा नहीं है — कृपया अपने केमिस्ट से एक बार पुष्टि कर लें।",
    confidenceMedium: "अधिकतर साफ़ है, फिर भी शक हो तो केमिस्ट से पूछ लें।",
    disclaimer:
      "दवाडॉक केवल आपकी पर्ची या दवा पर लिखी बातें समझाता है — यह डॉक्टरी सलाह नहीं है। कोई भी फैसला लेने से पहले हमेशा अपने डॉक्टर या केमिस्ट से पुष्टि करें।",
    errorGeneric: "कुछ गड़बड़ हो गई। कृपया दोबारा कोशिश करें।",
    footerBuiltFor: "परिवारों को साथ मिलकर पर्ची समझने में मदद के लिए बनाया गया।",
  },
} as const satisfies Record<Language, Record<string, string>>;

export const mealTimingLabel: Record<Language, Record<MealTiming, string>> = {
  en: {
    before_food: "Before food",
    after_food: "After food",
    with_food: "With food",
    empty_stomach: "Empty stomach",
    unspecified: "As directed",
  },
  hi: {
    before_food: "खाने से पहले",
    after_food: "खाने के बाद",
    with_food: "खाने के साथ",
    empty_stomach: "खाली पेट",
    unspecified: "जैसा बताया गया हो",
  },
};

export const timingSlotLabel: Record<Language, Record<TimingSlot, string>> = {
  en: {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    night: "Night",
  },
  hi: {
    morning: "सुबह",
    afternoon: "दोपहर",
    evening: "शाम",
    night: "रात",
  },
};
