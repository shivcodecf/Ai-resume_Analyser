"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analysis_controller_1 = require("../controllers/analysis.controller");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
router.post("/analyze", analysis_controller_1.analyze);
router.post("/analyze-pdf", upload_1.default.single("resume"), analysis_controller_1.analyzePDF);
exports.default = router;
