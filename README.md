# CareerFit AI

취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치 서비스

## 프로젝트 개요

CareerFit AI는 취업 준비생이 자신의 전공, 보유 스킬, 관심 직무를 기준으로 현재 역량을 점검하고 다음 준비 방향을 설계할 수 있도록 돕는 웹 서비스이다.

채용 공고와 공모전 정보는 많지만, 개인이 직접 모든 요구 역량을 비교하고 자신의 부족한 부분을 판단하기는 어렵다. CareerFit AI는 직무별 요구 스킬과 사용자 입력 정보를 함께 분석해, 어떤 역량을 보완해야 하는지와 어떤 프로젝트 경험을 쌓으면 좋은지 제안하는 것을 목표로 한다.

## 기획 의도

많은 학생과 취업 준비생은 포트폴리오를 만들어야 한다는 사실은 알지만, 어떤 직무를 기준으로 무엇을 준비해야 하는지에서 막히는 경우가 많다. 특히 전공 지식, 실무 스킬, 프로젝트 경험, 공모전 경험이 서로 따로 관리되면 취업 준비의 우선순위를 잡기 어렵다.

이 프로젝트는 단순한 채용 공고 목록 서비스가 아니라, 공고 데이터를 바탕으로 개인의 현재 상태를 해석하고 실천 가능한 준비 방향을 제안하는 AI 코치형 서비스를 지향한다.

## 대상 사용자

- 진로 방향을 구체화하고 싶은 대학생
- 취업 공고를 봐도 어떤 역량을 준비해야 할지 막막한 취업 준비생
- 전공과 관심 직무 사이의 연결점을 찾고 싶은 학생
- 포트폴리오, 프로젝트, 공모전 경험을 직무 중심으로 정리하고 싶은 사용자

## 핵심 목표

- 사용자의 전공, 보유 스킬, 관심 직무를 기반으로 맞춤형 커리어 조언 제공
- 채용 공고 데이터에서 자주 요구되는 스킬을 정리해 직무별 준비 방향 제시
- 부족한 역량과 추천 학습·프로젝트 방향을 이해하기 쉽게 제공
- 향후 RAG 기반으로 공고 및 공모전 데이터를 근거로 한 답변 생성

## 주요 기능

- `/health`: 백엔드 서버 상태 확인
- `/jobs`: 취업 공고 목록 조회
- `/jobs/{job_id}`: 특정 취업 공고 상세 조회
- `/analyze`: 사용자 전공, 스킬, 관심 직무 기반 AI 분석 요청
- `/analyze/stream`: SSE 기반 AI 분석 결과 스트리밍
- `MOCK_MODE`: 실제 Gemini API 호출과 목업 응답을 전환하기 위한 환경변수
- 역량 분석 입력 폼: 전공, 보유 스킬, 관심 직무 입력
- RAG 기반 AI 분석 결과 카드
- 출처 공고 카드: 어떤 데이터를 근거로 답변했는지 표시

## 프론트엔드 실행 방법

```bash
cd frontend
npm install
npm run dev
```

- 프론트엔드: http://localhost:5173
- 백엔드 API 문서: http://localhost:8000/docs

## 기술 스택

| 영역 | 기술 |
|---|---|
| 백엔드 | Python, FastAPI |
| AI API | Gemini 2.5 Flash-Lite |
| 데이터 처리 | Pandas |
| 데이터 저장·검색 | SQLite, ChromaDB |
| 프론트엔드 | React, Vite |
| 실행 환경 | Docker |

## 폴더 구조

```text
backend/
  main.py                # FastAPI 앱 진입점
  routers/               # API 라우터
  services/              # 서비스 로직
  data/                  # CSV 등 데이터 파일
docs/                    # 기획 및 실습 문서
```

## 진행 현황

- [x] 1일차: 프로젝트 기획 및 개발 환경 세팅
- [x] 2일차: FastAPI 서버 구축 및 Gemini API 연결
- [x] FastAPI 기반 백엔드 서버를 구성하고 `/health`, `/jobs`, `/analyze` 엔드포인트 구현
- [x] Gemini 2.5 Flash-Lite API 연결을 위한 환경변수 구조와 `MOCK_MODE` 설정
- [x] 데이터 분석 직무 예시 공고를 `backend/data/jobs.csv`에 정리
- [x] 3일차: Pandas 기반 데이터 전처리 파이프라인 구축
- [x] `backend/data/preprocess.py`에서 CSV 로드, 결측치 처리, 중복 제거, 스킬 키워드 표준화 구현
- [x] 전처리된 채용 공고 데이터를 SQLite `careerfit.db`의 `jobs` 테이블에 저장
- [x] RAG 검색 준비를 위해 채용 공고 데이터를 `rag_documents.json` 문서 형식으로 변환
- [x] 4일차: RAG 기반 서비스와 React UI 구현
- [x] ChromaDB 문서 검색 로직을 `rag_service.py`에 구현
- [x] Gemini RAG 연결 답변 생성을 `llm_service.py`에 구현
- [x] React + Vite 프로젝트 생성
- [x] `InputForm`, `ResultCard`, `SourceCard` 컴포넌트 구현
- [x] React 화면에서 FastAPI `/analyze` API 연결
- [x] SSE 기반 `/analyze/stream` 스트리밍 응답 추가
- [x] CareerFit AI UI 기준을 위한 `design-skill.md` 작성
- [ ] 5일차: Docker 기반 실행 환경 구성 및 포트폴리오 완성

## 4일차 커밋 예시

```bash
git add .
git commit -m "feat: RAG 기반 /analyze API 및 React UI 구현

- ChromaDB 문서 검색 (rag_service.py)
- Gemini RAG 연결 답변 생성 (llm_service.py)
- React + Vite 프로젝트 생성
- InputForm, ResultCard, SourceCard 컴포넌트
- fetch/EventSource로 분석 API 연결
- design-skill.md 작성"
git push
```

## 향후 개선

- SQLite에 저장된 `jobs` 데이터를 API 응답에 연결
- SSE 스트리밍 응답의 프론트엔드 표시 UX 개선
- Docker로 백엔드와 프론트엔드 실행 환경 통합
