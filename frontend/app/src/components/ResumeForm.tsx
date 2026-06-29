type Props = {
  resumeFile: File | null;
  jobDescription: string;
  setResumeFile: React.Dispatch<React.SetStateAction<File | null>>;
  setJobDescription: React.Dispatch<React.SetStateAction<string>>;
  handleAnalyze: () => void;
  loading: boolean;
};

export default function ResumeForm({
  resumeFile,
  jobDescription,
  setResumeFile,
  setJobDescription,
  handleAnalyze,
  loading,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-2">
          Upload Resume PDF
        </label>

        <p className="text-sm text-gray-500 mb-2">
          Upload your resume in PDF format
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setResumeFile(file);
            }
          }}
          className="w-full p-3 border rounded-lg bg-white"
        />

        {resumeFile && (
          <p className="text-green-600 mt-2 text-sm">
            Selected: {resumeFile.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">
          Job Description
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Paste the job posting / requirements you want to compare against
        </p>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Example: Looking for Backend Developer with Node.js, AWS..."
          className="w-full h-52 p-4 border rounded-lg bg-white"
        />
      </div>

      <button
        disabled={loading}
        onClick={handleAnalyze}
        className="px-6 py-3 rounded-lg bg-black text-white disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
