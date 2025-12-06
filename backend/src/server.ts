import "dotenv/config";
import app from "./app";
import { conncetDB } from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async(): Promise<void> => {
    await conncetDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
})