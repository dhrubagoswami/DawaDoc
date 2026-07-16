import type { Language } from "../types";

export interface OnboardingStep {
  title: string;
  description: string;
}

export interface OnboardingCopy {
  steps: OnboardingStep[];
  next: string;
  back: string;
  skip: string;
  done: string;
  helpButtonLabel: string;
}

export const onboardingCopy: Record<Language, OnboardingCopy> = {
  en: {
    steps: [
      {
        title: "Welcome to DawaDoc",
        description:
          "A simple way to understand any doctor's prescription or medicine strip — built for you and your parents.",
      },
      {
        title: "Step 1: Snap or upload",
        description:
          "On the scan page, tap \"Take a photo\" to use your camera, or \"Upload a photo\" to choose one from your gallery.",
      },
      {
        title: "Step 2: Let DawaDoc read it",
        description:
          "Tap \"Explain this medicine\" and wait a few seconds while it carefully reads the prescription or label.",
      },
      {
        title: "Step 3: Read or listen",
        description:
          "You'll see what each medicine is for, when to take it, and side effects to watch — tap \"Read aloud\" to have it read to you.",
      },
      {
        title: "One more thing",
        description:
          "Sign in with Google anytime to save your scans and revisit them later. It's completely optional — you can use DawaDoc right away without it.",
      },
    ],
    next: "Next",
    back: "Back",
    skip: "Skip",
    done: "Let's start",
    helpButtonLabel: "Show me how it works",
  },
  hi: {
    steps: [
      {
        title: "दवाडॉक में आपका स्वागत है",
        description:
          "डॉक्टर की पर्ची या दवा की पत्ती को समझने का आसान तरीका — आपके और आपके माता-पिता के लिए बनाया गया।",
      },
      {
        title: "चरण 1: फोटो लें या अपलोड करें",
        description:
          "स्कैन पेज पर \"फोटो लें\" बटन दबाकर कैमरे से फोटो लें, या \"फोटो अपलोड करें\" दबाकर गैलरी से कोई फोटो चुनें।",
      },
      {
        title: "चरण 2: दवाडॉक को पढ़ने दें",
        description: "\"यह दवा समझाएं\" दबाएं और कुछ पल रुकें जब तक यह पर्ची या लेबल ध्यान से पढ़ ले।",
      },
      {
        title: "चरण 3: पढ़ें या सुनें",
        description:
          "आपको हर दवा किस लिए है, कब लेनी है, और क्या ध्यान रखना है यह दिखेगा — \"ज़ोर से सुनाएं\" दबाकर सुन भी सकते हैं।",
      },
      {
        title: "एक और बात",
        description:
          "अपने स्कैन सुरक्षित रखने के लिए कभी भी Google से साइन इन करें। यह पूरी तरह वैकल्पिक है — बिना साइन इन किए भी दवाडॉक तुरंत इस्तेमाल कर सकते हैं।",
      },
    ],
    next: "आगे",
    back: "पीछे",
    skip: "छोड़ें",
    done: "शुरू करें",
    helpButtonLabel: "बताएं यह कैसे काम करता है",
  },
};
