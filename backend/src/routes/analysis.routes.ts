import express from "express";
import { analyze } from "../controllers/analysis.controller";

const router = express.Router();

router.post("/analyze", analyze);

export default router;