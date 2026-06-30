export type AnalysisResult = {
  score: number;
  missingKeywords: string[];
  strengths: string[];
  suggestions: string[];
};