from typing import List, Literal

from fastapi import APIRouter
from pydantic import BaseModel, Field

from services.llm_service import get_llm_response

router = APIRouter()


class AnalyzeRequest(BaseModel):
    major: str
    skills: List[str]
    job_type: str
    experience_years: int = Field(default=0, ge=0)
    preferred_company_size: Literal[
        "무관",
        "대기업",
        "중견기업",
        "스타트업",
    ] = "무관"


class AnalyzeResponse(BaseModel):
    answer: str
    sources: List[dict]


@router.post("/analyze", response_model=AnalyzeResponse, tags=["Analyze"])
def analyze_career(request: AnalyzeRequest):
    query = (
        f"전공: {request.major}, "
        f"보유 스킬: {', '.join(request.skills)}, "
        f"관심 직무: {request.job_type}, "
        f"경력 연수: {request.experience_years}, "
        f"선호 기업 규모: {request.preferred_company_size}"
    )

    result = get_llm_response(query=query, context_docs=[])

    return AnalyzeResponse(
        answer=result["answer"],
        sources=result["sources"]
    )
