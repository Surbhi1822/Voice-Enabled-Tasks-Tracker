import { IParsedTask } from "../interfaces/parsed-task.interface";
import { parseNaturalDate } from "../utils/date.utils";

const extractPriority = (text: string): IParsedTask["priority"] => {
  text = text.toLowerCase();
  if (text.includes("urgent") || text.includes("asap")) return "urgent";
  if (text.includes("high") || text.includes("very important")) return "high";
  if (text.includes("medium")) return "medium";
  if (text.includes("low") || text.includes("not important")) return "low";
  return "medium";
};

const extractStatus = (text: string): IParsedTask["status"] => {
  text = text.toLowerCase();
  if (text.includes("start") || text.includes("begin")) return "in-progress";
  if (text.includes("finish") || text.includes("complete") || text.includes("done"))
    return "done";
  return "todo";
};

const extractTitle = (text: string): string => {
  let result = text
    .replace(/^create (a )?task (to )?/i, "")
    .replace(/^add (a )?task (to )?/i, "")
    .replace(/^remind me to /i, "")
    .replace(/^i need to /i, "")
    .replace(/^please /i, "")
    .trim();

  if (result.includes(" by ")) result = result.split(" by ")[0];
  if (result.includes(" on ")) result = result.split(" on ")[0];

  return result || text;
};

const extractDescription = (text: string): string => {
  return text.trim();
};

const extractDueDate = (text: string): string | null => {
  let parsed = parseNaturalDate(text);
  if (parsed) return parsed;

  const isoMatch = text.match(/\d{4}-\d{2}-\d{2}/);
  if (isoMatch) {
    const d = new Date(isoMatch[0]);
    d.setHours(18, 0, 0, 0);
    return d.toISOString();
  }

  return null;
};

export const parseVoiceInput = async (transcript: string): Promise<IParsedTask> => {
  const cleaned = transcript.trim();

  return {
    rawTranscript: cleaned,
    title: extractTitle(cleaned),
    description: extractDescription(cleaned),
    priority: extractPriority(cleaned),
    status: extractStatus(cleaned),
    dueDate: extractDueDate(cleaned)
  };
};
