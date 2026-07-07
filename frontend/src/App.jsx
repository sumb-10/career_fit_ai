// frontend/src/App.jsx
import { useEffect, useRef, useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";
import SourceCard from "./components/SourceCard";
import { API_ENDPOINTS } from "./config/api";

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

    const eventSource = new EventSource(`${API_ENDPOINTS.analyzeStream}?${params.toString()}`);
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
    <main className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            RAG 기반 포트폴리오 코치
          </div>
          <h1 className="app-title">CareerFit AI</h1>
          <p className="app-description">
            전공, 보유 스킬, 관심 직무를 입력하면 실제 공고 데이터를 근거로
            다음 포트폴리오 준비 방향을 제안합니다.
          </p>
        </header>

        <div className="app-stack">
          <InputForm onSubmit={handleAnalyze} isLoading={isLoading} />

          {error && (
            <div className="message error-message" role="alert">{error}</div>
          )}

          {isLoading && (
            <div className="message loading-message" role="status" aria-live="polite">
              <span className="loading-dot" aria-hidden="true" />
              분석 결과를 실시간으로 작성하는 중입니다...
            </div>
          )}

          {result && (
            <ResultCard answer={result.answer} isLoading={isLoading} />
          )}

          {result?.sources && result.sources.length > 0 && (
            <SourceCard sources={result.sources} />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
