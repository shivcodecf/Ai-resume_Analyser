 import { Request, Response } from "express";
import { analyzeResume } from "../services/ai.service"

export async function analyze(req: Request, res: Response) {
  try {
    const { resumeText, jobDescription } = req.body;

    const result = await analyzeResume(
      resumeText,
      jobDescription
    );

    const parsedResult = JSON.parse(result);

    res.json({
      success: true,
      data: parsedResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Analysis failed",
    });
  }
}