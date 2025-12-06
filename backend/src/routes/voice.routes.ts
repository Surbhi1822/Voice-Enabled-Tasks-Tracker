import { Router } from "express";
import { parseTranscript } from "../controllers/voice.controller";

const router = Router();

router.post("/parse", parseTranscript);

export default router;