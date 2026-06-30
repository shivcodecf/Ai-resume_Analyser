export async function analyzeResume(
  resumeFile: File,
  jobDescription: string
) {
  try {
    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/analyze-pdf`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Analysis failed");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}