import { AnalysisResult as AnalysisType } from "@/types/analysis";

type Props = {
  result: AnalysisType;
};

export default function AnalysisResult({ result }: Props) {
  return (
   <div className="mt-10 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 space-y-8">
  {/* Header */}
  <div className="flex items-center justify-between flex-wrap gap-4">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">
        Analysis Result
      </h2>
      <p className="text-gray-500 mt-2">
        AI-powered ATS analysis of your resume
      </p>
    </div>

    {/* Score Badge */}
    <div
      className={`w-28 h-28 rounded-full flex flex-col items-center justify-center border-4
      ${
        result.score >= 80
          ? "border-green-500 bg-green-50"
          : result.score >= 50
          ? "border-yellow-500 bg-yellow-50"
          : "border-red-500 bg-red-50"
      }`}
    >
      <span
        className={`text-3xl font-bold
        ${
          result.score >= 80
            ? "text-green-600"
            : result.score >= 50
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {result.score}
      </span>
      <span className="text-xs text-gray-500">ATS Score</span>
    </div>
  </div>

  {/* Missing Keywords */}
  <div className="rounded-2xl bg-red-50 border border-red-100 p-6">
    <h3 className="text-lg font-semibold mb-4 text-red-700">
      Missing Keywords
    </h3>

    <div className="flex flex-wrap gap-3">
      {result.missingKeywords.length > 0 ? (
        result.missingKeywords.map((keyword, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-full bg-white border border-red-200 text-red-600 text-sm font-medium"
          >
            {keyword}
          </span>
        ))
      ) : (
        <p className="text-green-600 font-medium">
          No missing keywords 🎉
        </p>
      )}
    </div>
  </div>

  {/* Strengths */}
  <div className="rounded-2xl bg-green-50 border border-green-100 p-6">
    <h3 className="text-lg font-semibold mb-4 text-green-700">
      Strengths
    </h3>

    <div className="space-y-3">
      {result.strengths.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 border border-green-100"
        >
          <p className="text-gray-700">✅ {item}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Suggestions */}
  <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
    <h3 className="text-lg font-semibold mb-4 text-blue-700">
      Suggestions
    </h3>

    <div className="space-y-3">
      {result.suggestions.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 border border-blue-100"
        >
          <p className="text-gray-700">💡 {item}</p>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}