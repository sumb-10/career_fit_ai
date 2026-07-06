function SourceCard({ sources }) {
  if (!sources || sources.length === 0) {
    return <div className="empty-source">참고한 공고 데이터가 없습니다.</div>;
  }

  return (
    <section className="card source-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">참고한 공고 출처</h2>
          <p className="card-subtitle">AI 답변의 근거가 된 검색 결과입니다.</p>
        </div>
        <span className="status-pill">{sources.length}개 출처</span>
      </div>

      <div className="source-list">
        {sources.map((source, index) => (
          <article key={index} className="source-item">
            <p className="source-title">
              {source.company || "회사명 없음"} — {source.title || "공고명 없음"}
            </p>
            <p className="source-meta">직무: {source.job_type || "정보 없음"}</p>
            <p className="source-meta">필수 스킬: {source.required_skills || "정보 없음"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SourceCard;
