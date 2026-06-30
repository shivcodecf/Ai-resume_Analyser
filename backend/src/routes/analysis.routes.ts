import express from "express";
import { analyze, analyzePDF } from "../controllers/analysis.controller";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/analyze", analyze);

router.post(
  "/analyze-pdf",
  upload.single("resume"),
  analyzePDF
);

export default router;