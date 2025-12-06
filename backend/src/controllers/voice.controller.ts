import { Request, Response } from "express";
import { IParsedTask } from "../interfaces/parsed-task.interface";
import { parseVoiceInput } from "../services/voice-parser.service";

export const parseTranscript = async (req: Request, res: Response) => {
  try {
    const { transcript } = req.body;
    if (!transcript || typeof transcript !== "string") {
      return res.status(400).json({ error: "Transcript (string) required" });
    }

    const parsed: IParsedTask = await parseVoiceInput(transcript);
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
