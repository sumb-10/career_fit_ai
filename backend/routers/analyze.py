# backend/routers/analyze.py (RAG 연결 최종 버전)

from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List
from services.rag_service import search_documents
from services.llm_service import get_llm_response, stream_llm_response

router = APIRouter()

class AnalyzeRequest(BaseModel):
    major: str
    skills: List[str]
    job_type: str

class AnalyzeResponse(BaseModel):
    answer: str
    sources: List[dict]

@router.post("/analyze", response_model=AnalyzeResponse, tags=["Analyze"])
def analyze_career(request: AnalyzeRequest):
    """RAG 기반 역량 분석: ChromaDB 검색 → Gemini 답변 → sources 반환"""
    query = f"전공: {request.major}, 보유 스킬: {', '.join(request.skills)}, 관심 직무: {request.job_type}"
    context_docs = search_documents(query, n_results=3)
    result = get_llm_response(query=query, context_docs=context_docs)
    return AnalyzeResponse(answer=result["answer"], sources=result["sources"])


def build_streaming_response(query: str) -> StreamingResponse:
    context_docs = search_documents(query, n_results=3)

    return StreamingResponse(
        stream_llm_response(query=query, context_docs=context_docs),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.post("/analyze/stream", tags=["Analyze"])
def analyze_career_stream(request: AnalyzeRequest):
    """RAG 기반 역량 분석을 SSE(Server-Sent Events)로 스트리밍합니다."""
    query = f"전공: {request.major}, 보유 스킬: {', '.join(request.skills)}, 관심 직무: {request.job_type}"
    return build_streaming_response(query)


@router.get("/analyze/stream", tags=["Analyze"])
def analyze_career_stream_get(
    major: str = Query(...),
    skills: str = Query(..., description="쉼표로 구분된 보유 스킬"),
    job_type: str = Query(...),
):
    """EventSource에서 사용할 수 있는 GET 기반 SSE 엔드포인트입니다."""
    skill_list = [skill.strip() for skill in skills.split(",") if skill.strip()]
    query = f"전공: {major}, 보유 스킬: {', '.join(skill_list)}, 관심 직무: {job_type}"
    return build_streaming_response(query)
