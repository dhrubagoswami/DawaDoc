# DawaDoc

Upload a photo of a doctor's prescription or a medicine strip and get a plain-language
explanation (Hindi/English, with text-to-speech) of what the medicine is for, when to take it
relative to meals, and common side effects to watch for.

Built for elderly parents and their caregivers who struggle to read messy handwritten Indian
prescriptions. See [PLAN.md](./PLAN.md) for the full design/architecture writeup.

## Tech stack

- React + Vite + TypeScript + Tailwind CSS (frontend)
- Vercel serverless function (`/api/analyze`) calling the Gemini API for vision + explanation
- Browser Web Speech API for read-aloud (no extra API/cost)

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and add your Gemini API key (get one free at
   [aistudio.google.com/apikey](https://aistudio.google.com/apikey)):

   ```bash
   cp .env.example .env
   ```

3. Run with the Vercel CLI so both the frontend and the `/api` serverless function work together:

   ```bash
   npx vercel dev
   ```

   (First run will ask you to link/create a Vercel project — you can do this locally without
   deploying.)

   Alternatively, `npm run dev` runs the Vite dev server only (frontend UI, no API calls).

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Add an environment variable `GEMINI_API_KEY` in the Vercel project settings (Production +
   Preview).
4. Deploy — Vercel auto-detects the Vite frontend and the `/api` serverless function.

## Disclaimer

DawaDoc explains what is written on a prescription or medicine label — it is not medical advice.
Always confirm with a doctor or pharmacist before making any decisions.
