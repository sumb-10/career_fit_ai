import os

# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import health, jobs, analyze

DEFAULT_FRONTEND_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


def get_frontend_origins() -> list[str]:
    origins = os.getenv("FRONTEND_ORIGINS", "")

    if not origins:
        return DEFAULT_FRONTEND_ORIGINS

    return [
        origin.strip().rstrip("/")
        for origin in origins.split(",")
        if origin.strip()
    ]

app = FastAPI(
    title="CareerFit AI",
    description="취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_frontend_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(jobs.router)
app.include_router(analyze.router)


@app.get("/")
def root():
    return {"message": "CareerFit AI 서버가 실행 중입니다."}
