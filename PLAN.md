# DawaDoc — Project Plan

## 1. Problem & Scope
Elderly parents (and caregivers) can't read handwritten Indian prescriptions or understand medicine strips.
App lets a user upload/take a photo of a prescription or medicine strip and get a plain-language explanation
(Hindi/English, text + voice) of: what the medicine is for, dosage timing relative to meals, and common side
effects to watch for.

**In scope (4-day build):**
- Single core flow: upload image → OCR/vision read → LLM structured explanation → display + optional TTS playback.
- Language toggle: Hindi / English output.
- Clean, polished, mobile-first UI (this is a judged criterion, so UI gets real design time).
- No auth, no persistence beyond the current session (unless time permits — see stretch goals).

**Out of scope for v1:**
- User accounts, prescription history/database, multi-user support, drug-interaction checking, reminders/scheduling notifications, payment.

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Vite + TypeScript | Fast dev loop, good Vercel support |
| Styling | Tailwind CSS + a few hand-crafted components (no heavy UI kit) | Full control over visual polish, small bundle |
| Backend | Node.js + Express (deployed as Vercel serverless functions) | Keeps Gemini API key server-side, simple REST surface |
| AI | Google Gemini API (`gemini-2.5-flash` or `gemini-2.5-pro`, multimodal — image input directly, no separate OCR needed) | Single model handles vision + reasoning + structured output; native Hindi support |
| Voice | Browser Web Speech API (`SpeechSynthesis`) for TTS, client-side, free, no extra API needed | Zero backend cost, works offline once loaded, good enough Hindi/English voice support in Chrome/Edge |
| Hosting | Vercel (single project: React static build + `/api/*` serverless functions) | One deploy, free tier, matches user's request |
| Image handling | Client-side resize/compress (canvas) before upload to keep payloads small and within Gemini inline-image limits | Faster upload, lower token cost |

**Why Gemini directly for vision instead of separate OCR (e.g. Tesseract):** Gemini 2.5 models accept images
natively and are much better than classical OCR at reading messy handwriting, plus they can reason over the
image directly (skip a fragile OCR→text→LLM pipeline). One API call, one API key, less to build in 4 days.

## 3. Architecture

```
[Browser: React SPA]
   |  (1) capture/upload photo, client-side resize
   |  (2) POST /api/analyze  { imageBase64, language }
   v
[Vercel Serverless Function: /api/analyze.ts]
   |  (3) calls Gemini API (multimodal) with a strict prompt
   |      requesting structured JSON: { medicineName, purpose,
   |      dosageInstructions, timingRelativeToMeals, sideEffects[],
   |      warnings[], confidence, rawTextDetected }
   v
[Google Gemini API]
   |
   v
[Response -> validated/parsed JSON] --> back to browser
   |
[Browser renders result cards] + [Web Speech API reads it aloud on tap]
```

- API key (`GEMINI_API_KEY`) lives only in Vercel environment variables / server function — never shipped to client.
- One endpoint: `POST /api/analyze`. Stateless.
- Structured output enforced via Gemini's JSON mode / response schema so the frontend can render reliably instead of parsing free text.

## 4. UI / UX Plan (this is judged, so investing here)

- **Landing/home screen:** big, warm, high-contrast "Upload Prescription" call-to-action (camera capture on mobile, file picker on desktop), soft gradient background, large legible type — designed to be usable by someone with low vision/low tech literacy, or by a caregiver on their behalf.
- **Language toggle:** prominent Hindi/English switch (also affects TTS voice).
- **Loading state:** friendly animated state ("Reading the prescription...") — avoid a bare spinner.
- **Result screen:** card-based layout —
  - Medicine name header (large)
  - "What it's for" section
  - "When to take" section with a visual timing chip (before/after food, morning/afternoon/night icons)
  - "Watch out for" side-effects list with a caution color accent
  - A "Read aloud" button per section and for the whole result (Web Speech API)
  - A disclaimer footer ("Not a substitute for professional medical advice; confirm with your pharmacist/doctor")
- **Error/low-confidence state:** if Gemini reports low confidence or unreadable image, show a clear friendly retake prompt rather than a fabricated answer.
- Design language: soft rounded cards, generous spacing, accessible color contrast (WCAG AA), a calm health-tech palette (not clinical white — warm neutral background), large tap targets for elderly users.

## 5. Data / Prompt Design

Gemini prompt will instruct the model to:
1. Read the image (prescription or medicine strip/box).
2. Identify medicine name(s) (best-effort if handwriting is unclear, flag uncertainty).
3. Return strictly-typed JSON matching a defined schema (use Gemini's `responseSchema` / JSON mode).
4. Explain in the requested language (Hindi or English), at a plain, non-technical reading level.
5. Include a mandatory medical-disclaimer flag.

Never let the model give definitive medical dosing advice beyond what's written/inferred from the label — the app explains what's already on the prescription/strip, it does not prescribe.

## 6. Build Plan (4-day timeline)

- **Day 1:** Scaffold repo (Vite React TS + Tailwind), Express/Vercel function skeleton, Gemini API wiring with a hardcoded test image, confirm end-to-end JSON response.
- **Day 2:** Build core UI screens (upload, loading, result cards), wire real upload flow, image resize/compress on client.
- **Day 3:** Add Hindi/English toggle, Web Speech API TTS, polish visual design, responsive/mobile pass, error/low-confidence states.
- **Day 4:** Edge case testing with real messy prescription photos, accessibility pass (contrast, font sizes, tap targets), deploy to Vercel, final QA.

## 7. Environment Variables / Secrets

- `GEMINI_API_KEY` — required, set in Vercel project settings (Production + Preview), never committed.
- Will ask user for this when wiring the backend, and again to confirm it's set in Vercel dashboard (or via `vercel env add`).

## 8. Deployment

1. Initialize git repo, push to a new GitHub repo (user to confirm repo name/visibility).
2. Connect repo to Vercel (via `vercel` CLI or dashboard import).
3. Set `GEMINI_API_KEY` in Vercel env vars.
4. Deploy — Vercel auto-detects Vite frontend + `/api` serverless functions.

## 9. Stretch Goals (only if time remains)
- Save last N scans in browser localStorage (no backend DB) so user can revisit without re-uploading.
- Multi-photo upload (front + back of strip).
- Regional language beyond Hindi/English (Gemini supports many; toggle is extensible).
