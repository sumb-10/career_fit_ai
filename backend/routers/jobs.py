from fastapi import APIRouter, HTTPException

router = APIRouter()


# 목업 데이터: 3일차에 실제 CSV 데이터로 교체한다
MOCK_JOBS = [
    {
        "id": 1,
        "company": "카카오페이",
        "title": "데이터 분석가",
        "required_skills": ["Python", "SQL", "Tableau"],
        "preferred_skills": ["통계", "머신러닝"],
        "description": "결제 및 금융 서비스 데이터를 분석해 사용자 행동과 비즈니스 성과를 개선합니다. SQL과 Python을 활용해 지표를 설계하고 대시보드를 구축합니다.",
        "deadline": "2026-08-31"
    },
    {
        "id": 2,
        "company": "CJ제일제당",
        "title": "디지털 마케터",
        "required_skills": ["Google Analytics", "Excel", "SNS 마케팅"],
        "preferred_skills": ["콘텐츠 기획", "퍼포먼스 마케팅"],
        "description": "브랜드 캠페인의 성과를 분석하고 온라인 채널별 마케팅 전략을 수립합니다. 고객 데이터와 시장 트렌드를 바탕으로 광고 효율을 개선합니다.",
        "deadline": "2026-08-31"
    },
    {
        "id": 3,
        "company": "삼일회계법인",
        "title": "회계 담당자",
        "required_skills": ["재무회계", "Excel", "더존"],
        "preferred_skills": ["세무회계", "K-IFRS"],
        "description": "기업의 재무제표 작성과 회계 결산 업무를 지원합니다. 회계 기준에 따라 데이터를 검토하고 세무 신고 자료를 정리합니다.",
        "deadline": "2026-08-31"
    }
]


@router.get("/jobs", tags=["Jobs"])
def get_jobs():
    """
    취업 공고 목록을 반환하는 엔드포인트.

    현재는 목업 데이터를 반환하며, 3일차에 실제 데이터로 교체한다.
    """
    return {
        "count": len(MOCK_JOBS),
        "jobs": MOCK_JOBS
    }


@router.get("/jobs/{job_id}", tags=["Jobs"])
def get_job_by_id(job_id: int):
    """
    특정 공고의 상세 정보를 반환한다.
    """
    for job in MOCK_JOBS:
        if job["id"] == job_id:
            return job

    raise HTTPException(status_code=404, detail=f"공고 ID {job_id}를 찾을 수 없습니다.")
