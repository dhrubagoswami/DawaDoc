export type Language = "en" | "hi";

export type TimingSlot = "morning" | "afternoon" | "evening" | "night";

export type MealTiming = "before_food" | "after_food" | "with_food" | "empty_stomach" | "unspecified";

export interface MedicineEntry {
  name: string;
  purpose: string;
  dosageInstructions: string;
  mealTiming: MealTiming;
  timingSlots: TimingSlot[];
  sideEffects: string[];
  warnings: string[];
}

export interface AnalysisResult {
  isReadable: boolean;
  unreadableReason?: string;
  documentType: "prescription" | "medicine_strip" | "unknown";
  medicines: MedicineEntry[];
  generalNotes?: string;
  confidence: "high" | "medium" | "low";
}

export interface AnalyzeRequestBody {
  imageBase64: string;
  mimeType: string;
  language: Language;
}

export interface AnalyzeErrorBody {
  error: string;
}
