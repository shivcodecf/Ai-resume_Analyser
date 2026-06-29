"use client";

import { useState } from "react";
import ResumeForm from "@/components/ResumeForm";
import AnalysisResult from "@/components/AnalysisResult";
import { AnalysisResult as AnalysisType } from "@/types/analysis";
import { analyzeResume } from "@/services/analysis";

export default function Home() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisType | null>(null);

  const handleAnalyze = async () => {
    try {
      if (!resumeFile) {
        alert("Please upload resume PDF");
        return;
      }

      setLoading(true);

      const data = await analyzeResume(
        resumeFile,
        jobDescription
      );

      setResult(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          AI Resume Analyzer
        </h1>

        <ResumeForm
          resumeFile={resumeFile}
          jobDescription={jobDescription}
          setResumeFile={setResumeFile}
          setJobDescription={setJobDescription}
          handleAnalyze={handleAnalyze}
          loading={loading}
        />

        {result && <AnalysisResult result={result} />}
      </div>
    </main>
  );
}