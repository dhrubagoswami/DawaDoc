import type { VercelRequest, VercelResponse } from "@vercel/node";
import { runAnalyze } from "../server/analyzeHandler.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { status, body } = await runAnalyze(req.body ?? {}, process.env.GEMINI_API_KEY);
  res.status(status).json(body);
}
