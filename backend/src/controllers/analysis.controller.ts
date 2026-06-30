import { Request, Response } from "express";
import { analyzeResume } from "../services/ai.service";
import { extractTextFromPDF } from "../services/pdf.service";

export async function analyze(req: Request, res: Response) {
  try {
    const { resumeText, jobDescription } = req.body;

    const result = await analyzeResume(resumeText, jobDescription);

    let parsedResult;

    if (result) {
      parsedResult = JSON.parse(result);
    }

    res.json({
      success: true,
      data: parsedResult,
    });
  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Analysis failed",
    });
  }
}





export async function analyzePDF(req: Request, res: Response) {
  try {
    const file = req.file;
    const { jobDescription } = req.body;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "PDF file required",
      });
    }

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description required",
      });
    }

    const resumeText = await extractTextFromPDF(file.path);

    const result = await analyzeResume(resumeText, jobDescription);

    if (!result) {
      throw new Error("AI returned empty response");
    }

    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedResult = JSON.parse(cleaned);

    res.json({
      success: true,
      data: parsedResult,
    });


  } catch (error) {

    console.error(error);


    res.status(500).json({
      success: false,
      message: "PDF analysis failed",
    });
  }
}
