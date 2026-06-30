"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = analyze;
exports.analyzePDF = analyzePDF;
const ai_service_1 = require("../services/ai.service");
const pdf_service_1 = require("../services/pdf.service");
async function analyze(req, res) {
    try {
        const { resumeText, jobDescription } = req.body;
        const result = await (0, ai_service_1.analyzeResume)(resumeText, jobDescription);
        let parsedResult;
        if (result) {
            parsedResult = JSON.parse(result);
        }
        res.json({
            success: true,
            data: parsedResult,
        });
    }
    catch (error) {
        console.error("FULL ERROR:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Analysis failed",
        });
    }
}
async function analyzePDF(req, res) {
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
        const resumeText = await (0, pdf_service_1.extractTextFromPDF)(file.path);
        const result = await (0, ai_service_1.analyzeResume)(resumeText, jobDescription);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "PDF analysis failed",
        });
    }
}
