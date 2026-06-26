export async function analyzeResume(
  resumeText: string,
  jobDescription: string
) {
  const prompt = `
You are an ATS resume evaluator.

Compare resume with job description.

Return JSON only:
{
  "score": number,
  "missingKeywords": string[],
  "strengths": string[],
  "suggestions": string[]
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
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
    }
  );

  const data = await response.json();

  console.log(data);

  return data.candidates?.[0]?.content?.parts?.[0]?.text;
}