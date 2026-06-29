import { AnalysisResult as AnalysisType } from "@/types/analysis";

type Props = {
  result: AnalysisType;
};

export default function AnalysisResult({ result }: Props) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>

      <p className="mb-4">
        Score: <strong>{result.score}</strong>
      </p>

      <div className="mb-4">
        <h3 className="font-bold">Missing Keywords</h3>
        <ul className="list-disc ml-6">
          {result.missingKeywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Strengths</h3>
        <ul className="list-disc ml-6">
          {result.strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold">Suggestions</h3>
        <ul className="list-disc ml-6">
          {result.suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}