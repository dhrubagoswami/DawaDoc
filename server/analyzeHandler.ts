import { GoogleGenAI, Type } from "@google/genai";

const MODEL = "gemini-flash-latest";

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    isReadable: { type: Type.BOOLEAN },
    unreadableReason: { type: Type.STRING },
    documentType: {
      type: Type.STRING,
      enum: ["prescription", "medicine_strip", "unknown"],
    },
    medicines: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          purpose: { type: Type.STRING },
          dosageInstructions: { type: Type.STRING },
          mealTiming: {
            type: Type.STRING,
            enum: ["before_food", "after_food", "with_food", "empty_stomach", "unspecified"],
          },
          timingSlots: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
              enum: ["morning", "afternoon", "evening", "night"],
            },
          },
          sideEffects: { type: Type.ARRAY, items: { type: Type.STRING } },
          warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["name", "purpose", "dosageInstructions", "mealTiming", "timingSlots", "sideEffects", "warnings"],
      },
    },
    generalNotes: { type: Type.STRING },
    confidence: { type: Type.STRING, enum: ["high", "medium", "low"] },
  },
  required: ["isReadable", "documentType", "medicines", "confidence"],
};

function buildPrompt(language: "en" | "hi") {
  const languageName = language === "hi" ? "Hindi (Devanagari script)" : "English";
  return `You are DawaDoc, an assistant that helps elderly patients and their families understand a doctor's
prescription or a medicine strip/box from a photo.

Look carefully at the attached image. It may contain messy handwriting, be partially cut off, or be a printed
medicine strip. Do your best to identify each distinct medicine mentioned.

For EACH medicine you can identify, explain in extremely simple, plain, non-technical ${languageName} that a
non-medical elderly person can understand:
- What condition/symptom it is generally used for (purpose).
- Dosage instructions exactly as written or clearly implied (e.g. "1 tablet twice a day").
- Whether it should be taken before, after, or with food, or on an empty stomach (mealTiming), and which times
  of day it applies to (timingSlots).
- Common, well-known side effects to watch for (sideEffects) — keep this to the most relevant few, not an
  exhaustive package-insert list.
- Any important warnings (warnings) — e.g. "do not stop suddenly", "avoid alcohol", "consult doctor if fever
  persists beyond 3 days" — ONLY if such information is written on the image or is extremely standard,
  well-known guidance for that exact medicine. Do not invent dosing advice that isn't on the label.

If the image is blurry, unreadable, or not a prescription/medicine strip at all, set isReadable to false and
explain briefly why in unreadableReason (in ${languageName}), and leave medicines as an empty array.

Set confidence to "low" if you are guessing at any medicine name due to poor handwriting, "medium" if mostly
clear with minor uncertainty, "high" if fully legible and clear.

All text values in your response (purpose, dosageInstructions, sideEffects, warnings, generalNotes,
unreadableReason) must be written in ${languageName}. Keep language simple and warm, suitable for reading aloud
to an elderly person. This is informational only, not a medical prescription or professional advice — do not
fabricate details that are not visible or standard knowledge for the identified medicine.`;
}

export interface AnalyzeRequestBody {
  imageBase64?: unknown;
  mimeType?: unknown;
  language?: unknown;
}

export interface HandlerResult {
  status: number;
  body: unknown;
}

export async function runAnalyze(reqBody: AnalyzeRequestBody, apiKey: string | undefined): Promise<HandlerResult> {
  if (!apiKey) {
    return { status: 500, body: { error: "Server is missing GEMINI_API_KEY configuration." } };
  }

  const { imageBase64, mimeType, language } = reqBody ?? {};

  if (!imageBase64 || typeof imageBase64 !== "string") {
    return { status: 400, body: { error: "Missing image data." } };
  }
  if (!mimeType || typeof mimeType !== "string" || !mimeType.startsWith("image/")) {
    return { status: 400, body: { error: "Missing or invalid image mime type." } };
  }
  const lang = language === "hi" ? "hi" : "en";

  try {
    const ai = new GoogleGenAI({ apiKey });

    const result = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { text: buildPrompt(lang) },
            { inlineData: { mimeType, data: imageBase64 } },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = result.text;
    if (!text) {
      return { status: 502, body: { error: "The AI did not return a result. Please try again." } };
    }

    return { status: 200, body: JSON.parse(text) };
  } catch (err) {
    console.error("Gemini analyze error:", err);
    return { status: 502, body: { error: "Something went wrong while analyzing the image. Please try again." } };
  }
}
