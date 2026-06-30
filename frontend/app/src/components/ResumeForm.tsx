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
    <div className="space-y-8 bg-white shadow-xl rounded-2xl p-8 border border-gray-200 mt-[50px]">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Upload Resume & Analyze
        </h2>

        <p className="mt-3 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Upload your resume, compare it with any job description, and get an
          instant ATS score with AI-powered insights.
        </p>
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-lg font-semibold mb-3 text-gray-800">
          Resume PDF
        </label>

        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <div className="flex flex-col items-center justify-center">
            <p className="text-4xl mb-2">📄</p>
            <p className="font-medium text-gray-700">Click to upload resume</p>
            <p className="text-sm text-gray-500">PDF only (Max 5MB)</p>
          </div>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setResumeFile(file);
              }
            }}
          />
        </label>

        {resumeFile && (
          <div className="mt-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            <div className="flex items-center gap-2">
              <span>📄</span>
              <p className="text-green-700 font-medium">{resumeFile.name}</p>
            </div>

            <button
              type="button"
              onClick={() => setResumeFile(null)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Job Description */}
      <div>
        <label className="block text-lg font-semibold mb-3 text-gray-800">
          Job Description
        </label>

        <p className="text-sm text-gray-500 mb-3">
          Paste the job requirements you want to compare against.
        </p>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Example: Looking for Backend Developer with Node.js, AWS, Docker..."
          className="w-full h-64 p-4 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Analyze Button */}
      <button
        disabled={loading}
        onClick={handleAnalyze}
        className="w-full py-4 rounded-xl bg-black text-white font-semibold text-lg hover:scale-[1.01] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>
    </div>
  );
}
