import { useState } from "react";

function InputForm({ onSubmit, isLoading }) {
  const [major, setMajor] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [jobType, setJobType] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const skills = skillsInput.split(",").map(s => s.trim()).filter(Boolean);
    onSubmit({ major: major.trim(), skills, jobType: jobType.trim() });
  }

  return (
    <form className="card input-card" onSubmit={handleSubmit}>
      <div className="card-header">
        <div>
          <h2 className="card-title">내 정보 입력</h2>
          <p className="card-subtitle">전공과 스킬을 기준으로 맞춤 분석을 시작합니다.</p>
        </div>
        <span className="status-pill">3단계 입력</span>
      </div>

      <div className="form-grid">
        <div className="field">
          <label className="field-label" htmlFor="major">전공</label>
          <input id="major" className="text-input" type="text" value={major} onChange={e => setMajor(e.target.value)}
            placeholder="예: 통계학과"
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="skills">보유 스킬</label>
          <input id="skills" className="text-input" type="text" value={skillsInput} onChange={e => setSkillsInput(e.target.value)}
            placeholder="예: Python, SQL, R"
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="job-type">관심 직무</label>
          <input id="job-type" className="text-input" type="text" value={jobType} onChange={e => setJobType(e.target.value)}
            placeholder="예: 데이터 분석"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !major.trim() || !skillsInput.trim() || !jobType.trim()}
          className="primary-button"
        >
          {isLoading ? "분석 중..." : "역량 분석 요청"}
        </button>
      </div>
    </form>
  );
}

export default InputForm;

