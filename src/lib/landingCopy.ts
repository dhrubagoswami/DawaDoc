import type { Language } from "../types";

export interface LandingFeature {
  title: string;
  description: string;
}

export interface LandingStep {
  title: string;
  description: string;
}

export interface SignInBenefit {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export interface LandingCopy {
  navCta: string;
  heroEyebrow: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroCta: string;
  heroReassurance: string;
  heroCardLabel: string;
  howItWorksTitle: string;
  steps: LandingStep[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: LandingFeature[];
  signInBenefitsTitle: string;
  signInBenefitsSubtitle: string;
  signInBenefits: SignInBenefit[];
  signInBenefitsCta: string;
  signInBenefitsGuestNote: string;
  comingSoonBadge: string;
  trustTitle: string;
  trustBody: string;
  finalTitle: string;
  finalSubtitle: string;
  finalCta: string;
}

export const landingCopy: Record<Language, LandingCopy> = {
  en: {
    navCta: "Get started",
    heroEyebrow: "For every family with an elderly parent",
    heroTitle: "That handwriting shouldn't be a mystery to",
    heroTitleAccent: "the people who need it most.",
    heroSubtitle:
      "Snap a photo of a doctor's prescription or a medicine strip. DawaDoc reads it and explains it in plain Hindi or English — what it treats, when to take it, and what to watch out for — so your parents don't have to just trust the pharmacist blindly.",
    heroCta: "Try it now — it's free",
    heroReassurance: "No sign-up needed. Your photo is never stored.",
    heroCardLabel: "Explained in seconds",
    howItWorksTitle: "Three steps. Under a minute.",
    steps: [
      {
        title: "Snap or upload",
        description: "Take a photo of the prescription or medicine strip, or upload one from your gallery.",
      },
      {
        title: "AI reads it",
        description: "Our AI carefully reads even messy handwriting and printed medicine labels.",
      },
      {
        title: "Get a simple explanation",
        description: "See what each medicine is for, when to take it, and side effects — read aloud if you like.",
      },
    ],
    featuresTitle: "Built for clarity, not confusion",
    featuresSubtitle: "Every detail designed around the person who actually has to understand it.",
    features: [
      {
        title: "Reads messy handwriting",
        description: "Trained to make sense of the notoriously unreadable handwriting on Indian prescriptions.",
      },
      {
        title: "Hindi or English, your choice",
        description: "Every explanation is available in plain, simple Hindi or English — switch anytime.",
      },
      {
        title: "Dosage timing made obvious",
        description: "Before food, after food, morning, night — timing is laid out clearly, not buried in jargon.",
      },
      {
        title: "Side effects to watch for",
        description: "A short, relevant list of what to look out for — not an overwhelming package insert.",
      },
      {
        title: "Read aloud",
        description: "Tap once and have the explanation read aloud — ideal for low vision or low reading comfort.",
      },
      {
        title: "Not a substitute for a doctor",
        description: "DawaDoc explains what's written on the label. It always encourages confirming with a pharmacist.",
      },
    ],
    signInBenefitsTitle: "Get more by signing in",
    signInBenefitsSubtitle: "Free either way — signing in just makes it easier to keep track over time.",
    signInBenefits: [
      {
        title: "Save your prescription history",
        description:
          "Every photo you scan (only when it's read successfully) and its explanation is saved to your account, so you don't have to re-upload it later.",
      },
      {
        title: "Pick up where you left off",
        description: "Come back anytime — yesterday's medicine, last month's checkup, all in one place.",
      },
      {
        title: "Share with family",
        description:
          "Send just the plain-language findings to your children or caregivers, so everyone's on the same page.",
        comingSoon: true,
      },
      {
        title: "Your language, remembered",
        description: "Set your preferred language once in your profile and DawaDoc opens in it every time.",
      },
    ],
    signInBenefitsCta: "Sign in with Google",
    signInBenefitsGuestNote: "Prefer not to sign in? You can still scan and read prescriptions with no account at all.",
    comingSoonBadge: "Coming soon",
    trustTitle: "Built with care, not to replace your doctor",
    trustBody:
      "DawaDoc is an explanation tool, not a medical authority. It reads what's already on your prescription or medicine and puts it in plain words. Always confirm with your doctor or pharmacist before making any decisions.",
    finalTitle: "Interested?",
    finalSubtitle: "Let's start decoding your prescription together.",
    finalCta: "Upload a prescription",
  },
  hi: {
    navCta: "शुरू करें",
    heroEyebrow: "हर उस परिवार के लिए जिनके घर में बुज़ुर्ग माता-पिता हैं",
    heroTitle: "डॉक्टर की लिखावट अब उनके लिए भी पहेली नहीं",
    heroTitleAccent: "जिन्हें इसे सबसे ज़्यादा समझना ज़रूरी है।",
    heroSubtitle:
      "डॉक्टर की पर्ची या दवा की पत्ती की फोटो लें। दवाडॉक उसे पढ़कर आसान हिंदी या अंग्रेज़ी में समझाएगा — यह किस बीमारी के लिए है, कब लेनी है, और किन बातों का ध्यान रखना है — ताकि आपके माता-पिता को सिर्फ़ केमिस्ट पर आँख मूंदकर भरोसा न करना पड़े।",
    heroCta: "अभी आज़माएं — बिल्कुल मुफ़्त",
    heroReassurance: "साइन-अप की ज़रूरत नहीं। आपकी फोटो कभी सेव नहीं की जाती।",
    heroCardLabel: "सेकंडों में जानकारी",
    howItWorksTitle: "तीन आसान चरण। एक मिनट से भी कम समय में।",
    steps: [
      {
        title: "फोटो लें या अपलोड करें",
        description: "पर्ची या दवा की पत्ती की फोटो खींचें, या गैलरी से कोई फोटो अपलोड करें।",
      },
      {
        title: "AI इसे पढ़ता है",
        description: "हमारा AI बेहद उलझी हुई लिखावट और छपे हुए दवा के लेबल भी ध्यान से पढ़ता है।",
      },
      {
        title: "आसान भाषा में जानकारी पाएं",
        description: "हर दवा किस लिए है, कब लेनी है, और साइड इफ़ेक्ट क्या हैं — चाहें तो ज़ोर से भी सुनें।",
      },
    ],
    featuresTitle: "उलझन के लिए नहीं, स्पष्टता के लिए बनाया गया",
    featuresSubtitle: "हर छोटी बात उस इंसान को ध्यान में रखकर बनाई गई है जिसे इसे सच में समझना है।",
    features: [
      {
        title: "उलझी हुई लिखावट भी पढ़ता है",
        description: "भारतीय प्रिस्क्रिप्शन की मशहूर अस्पष्ट लिखावट को समझने के लिए बनाया गया।",
      },
      {
        title: "हिंदी या अंग्रेज़ी, आपकी पसंद",
        description: "हर जानकारी आसान हिंदी या अंग्रेज़ी में उपलब्ध है — कभी भी बदल सकते हैं।",
      },
      {
        title: "कब लेनी है, बिल्कुल साफ़",
        description: "खाने से पहले, बाद में, सुबह, रात — समय साफ़-साफ़ बताया जाता है, मुश्किल शब्दों में नहीं।",
      },
      {
        title: "किन बातों का ध्यान रखें",
        description: "एक छोटी, ज़रूरी सूची जो असल में काम की है — पूरा भारी-भरकम पर्चा नहीं।",
      },
      {
        title: "ज़ोर से सुनाएं",
        description: "एक टैप में जानकारी ज़ोर से सुनी जा सकती है — कम दिखने या पढ़ने में दिक्कत होने पर बेहद मददगार।",
      },
      {
        title: "डॉक्टर की जगह नहीं",
        description: "दवाडॉक सिर्फ़ लेबल पर लिखी बातें समझाता है। हमेशा केमिस्ट या डॉक्टर से पुष्टि करने की सलाह देता है।",
      },
    ],
    signInBenefitsTitle: "साइन इन करके और भी सुविधाएं पाएं",
    signInBenefitsSubtitle: "दोनों तरह से मुफ़्त है — साइन इन करने से बस पुरानी जानकारी संभालना आसान हो जाता है।",
    signInBenefits: [
      {
        title: "अपनी पर्चियों का इतिहास सुरक्षित रखें",
        description:
          "जो भी फोटो सही से पढ़ी जाती है वह और उसकी जानकारी आपके खाते में सेव हो जाती है, ताकि दोबारा अपलोड न करना पड़े।",
      },
      {
        title: "जहां छोड़ा था वहीं से शुरू करें",
        description: "कभी भी वापस आएं — कल की दवा हो या पिछले महीने की जांच, सब एक ही जगह मिलेगा।",
      },
      {
        title: "परिवार के साथ साझा करें",
        description:
          "सिर्फ़ आसान भाषा में समझी गई जानकारी अपने बच्चों या देखभाल करने वालों को भेजें, ताकि सब एक जैसी जानकारी रखें।",
        comingSoon: true,
      },
      {
        title: "आपकी भाषा, याद रखी जाएगी",
        description: "अपनी पसंदीदा भाषा प्रोफ़ाइल में एक बार सेट करें, दवाडॉक हर बार उसी में खुलेगा।",
      },
    ],
    signInBenefitsCta: "Google से साइन इन करें",
    signInBenefitsGuestNote: "साइन इन नहीं करना चाहते? बिना खाते के भी पर्ची स्कैन और पढ़ सकते हैं।",
    comingSoonBadge: "जल्द आ रहा है",
    trustTitle: "देखभाल के साथ बनाया गया, डॉक्टर की जगह लेने के लिए नहीं",
    trustBody:
      "दवाडॉक एक जानकारी देने वाला टूल है, चिकित्सा प्राधिकरण नहीं। यह आपकी पर्ची या दवा पर पहले से लिखी बातों को आसान भाषा में बताता है। कोई भी फैसला लेने से पहले हमेशा अपने डॉक्टर या केमिस्ट से पुष्टि करें।",
    finalTitle: "दिलचस्पी है?",
    finalSubtitle: "आइए साथ मिलकर आपकी पर्ची को समझना शुरू करें।",
    finalCta: "पर्ची अपलोड करें",
  },
};
