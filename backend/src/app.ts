import express from "express";
import cors from "cors";
import morgan from "morgan";
import taskRoutes from "./routes/task.routes";
import voicRoutes from "./routes/voice.routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));

app.use("/api/tasks", taskRoutes);
app.use("/api/voice", voicRoutes);

app.get("/api/health", (_req, res) => res.json({status: "ok"}));

export default app;