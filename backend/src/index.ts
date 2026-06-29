import express from "express";
import analysisRoutes from "./routes/analysis.routes";
import cors from "cors";
import dotenv from "dotenv"


dotenv.config()

// console.log("GEMINI KEY =", process.env.GEMINI_API_KEY);

const app = express();

app.use(express.json());


app.use(cors({
 origin:"http://localhost:3000"   
}));


const PORT = 1120;

app.use("/api", analysisRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
