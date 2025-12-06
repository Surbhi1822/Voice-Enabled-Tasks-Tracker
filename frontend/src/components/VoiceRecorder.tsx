import React, { useState, useRef } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import VoicePreviewModal from "./VoicePreviewModal";
import type { IParsedTask, ITask } from "../types";
import { api } from "../lib/api";

interface VoiceRecorderProps {
  onClose: () => void;
  onTaskCreated: () => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onClose,
  onTaskCreated,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parsedTask, setParsedTask] = useState<IParsedTask | null>(null);

  const recognitionRef = useRef<any>(null);

  const initRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    return recognition;
  };

  const startRecording = () => {
    const recognition = initRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;
    setIsRecording(true);

    recognition.start();

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      await sendTranscriptToBackend(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      alert("Speech recognition failed. Try again.");
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendTranscriptToBackend = async (transcript: string) => {
    try {
      setLoading(true);

      const res = await api.post<IParsedTask>("/voice/parse", {
        transcript,
      });

      setParsedTask(res.data);
    } catch (err) {
      console.error("Voice parsing failed:", err);
      alert("Could not process your spoken input.");
    } finally {
      setLoading(false);
    }
  };

 const handleVoiceSave = async (taskData: Partial<ITask>) => {
    try {
      await api.post("/tasks", taskData);
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error("Voice task creation failed:", error);
      alert("Failed to create task");
    }
  };


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={() => {
          stopRecording();
          onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          className="glass p-8 rounded-2xl max-w-md w-full mx-4 text-center"
        >
          <h2 className="text-xl font-heading font-bold mb-4">Voice Recorder</h2>

          <div className="flex flex-col items-center gap-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="h-20 w-20 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 transition"
              >
                <Mic className="h-8 w-8" />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="h-20 w-20 rounded-full bg-destructive text-white flex items-center justify-center animate-pulse"
              >
                <Square className="h-8 w-8" />
              </button>
            )}

            <p className="text-sm text-muted-foreground">
              {isRecording ? "Listening…" : "Tap to start speaking"}
            </p>

            {loading && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">
                  Processing…
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      
      {parsedTask && (
        <VoicePreviewModal
          transcript={parsedTask.rawTranscript}
          parsedTask={parsedTask}
          onClose={() => setParsedTask(null)}
          onSave={handleVoiceSave}
        />
      )}

    </>
  );
};

export default VoiceRecorder;
