import express from "express";
import analysisRoutes from "./routes/analysis.routes";
import dotenv from "dotenv"

dotenv.config()

console.log("GEMINI KEY =", process.env.GEMINI_API_KEY);

const app = express();

app.use(express.json());



const PORT = 1120;

app.use("/api", analysisRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
