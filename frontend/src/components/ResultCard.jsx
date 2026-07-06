function ResultCard({ answer, isLoading }) {
  return (
    <section className="card result-card" aria-live="polite">
      <div className="card-header">
        <div>
          <h2 className="card-title">AI 분석 결과</h2>
          <p className="card-subtitle">공고 데이터와 사용자 입력을 함께 참고한 조언입니다.</p>
        </div>
        <span className="status-pill">추천 분석</span>
      </div>

      <p className={`answer-text ${isLoading ? "typing-caret" : ""}`}>
        {answer || "분석 결과가 이곳에 표시됩니다."}
      </p>
    </section>
  );
}
export default ResultCard;
