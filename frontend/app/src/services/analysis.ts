export async function analyzeResume(
  resumeFile: File,
  jobDescription: string
) {
  try {
    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    const response = await fetch(
      "http://localhost:1120/api/analyze-pdf",
      {
        method: "POST",
        body: formData,
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}