// frontend/src/App.jsx
import { useEffect, useRef, useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";
import SourceCard from "./components/SourceCard";

const API_BASE = "http://127.0.0.1:8000";
// ⚠️ API Key는 절대 여기에 넣지 않습니다

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  function handleAnalyze(formData) {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setIsLoading(true);
    setError(null);
    setResult({ answer: "", sources: [] });

    const params = new URLSearchParams({
      major: formData.major,
      skills: formData.skills.join(","),
      job_type: formData.jobType,
    });

    const eventSource = new EventSource(`${API_BASE}/analyze/stream?${params.toString()}`);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("sources", (event) => {
      const data = JSON.parse(event.data);
      setResult((prev) => ({
        answer: prev?.answer || "",
        sources: data.sources || [],
      }));
    });

    eventSource.addEventListener("token", (event) => {
      const data = JSON.parse(event.data);
      setResult((prev) => ({
        answer: `${prev?.answer || ""}${data.text || ""}`,
        sources: prev?.sources || [],
      }));
    });

    eventSource.addEventListener("done", () => {
      eventSource.close();
      eventSourceRef.current = null;
      setIsLoading(false);
    });

    eventSource.addEventListener("error", (event) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        setError(data.message || "스트리밍 중 오류가 발생했습니다.");
      } else {
        setError("FastAPI 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.");
      }

      eventSource.close();
      eventSourceRef.current = null;
      setIsLoading(false);
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">CareerFit AI</h1>
        <p className="text-slate-500 text-sm mb-8">취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치</p>

        <InputForm onSubmit={handleAnalyze} isLoading={isLoading} />

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        {isLoading && (
          <div className="mt-8 text-center text-slate-500">분석 중입니다...</div>
        )}

        {result && (
          <div className="mt-8 space-y-4">
            <ResultCard answer={result.answer} />
            {result.sources && result.sources.length > 0 && (
              <SourceCard sources={result.sources} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
