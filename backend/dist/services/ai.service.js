"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeResume = analyzeResume;
async function analyzeResume(resumeText, jobDescription) {
    // Prevent huge payloads
    const trimmedResume = resumeText.slice(0, 2500);
    const trimmedJD = jobDescription.slice(0, 2500);
    const prompt = `
You are an ATS resume evaluator.

Compare the resume with job description.

Scoring Rules:
- 90-100 => Excellent match
- 70-89 => Good match
- 40-69 => Partial match
- 0-39 => Poor match

Return ONLY raw JSON.
Do not wrap in markdown.
Do not add explanation.

Format:
{
  "score": number,
  "missingKeywords": string[],
  "strengths": string[],
  "suggestions": string[]
}

Resume:
${trimmedResume}

Job Description:
${trimmedJD}
`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        }),
    });
    const data = await response.json();
    console.log("FULL GEMINI RESPONSE:");
    console.log(JSON.stringify(data, null, 2));
    if (!response.ok) {
        throw new Error(data?.error?.message || "Gemini API failed");
    }
    if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No candidates returned from Gemini");
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
        throw new Error("Gemini returned empty text");
    }
    return text;
}
// Server is running on port 1120
// {
//   candidates: [ { content: [Object], finishReason: 'STOP', index: 0 } ],
//   usageMetadata: {
//     promptTokenCount: 86,
//     candidatesTokenCount: 129,
//     totalTokenCount: 787,
//     promptTokensDetails: [ [Object] ],
//     thoughtsTokenCount: 572,
//     serviceTier: 'standard'
//   },
//   modelVersion: 'gemini-3.5-flash',
//   responseId: 'xbM-aoKcIZjijuMP26XYuAc'
// }
