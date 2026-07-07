# Render Frontend Deploy Guide

CareerFit AI의 React/Vite 프론트엔드를 Docker 기반 Render Web Service로 배포하는 방법입니다.

## 1. 로컬 실행 방법

백엔드:

```bash
cd backend
uvicorn main:app --reload
```

프론트엔드:

```bash
cd frontend
npm install
npm run dev
```

로컬 주소:

- 프론트엔드: `http://localhost:5173`
- 백엔드 API 문서: `http://localhost:8000/docs`
- 백엔드 헬스체크: `http://localhost:8000/health`

## 2. 프론트엔드 환경변수 설정

프론트엔드는 `VITE_API_BASE_URL`로 백엔드 주소를 읽습니다.

로컬 개발용 `frontend/.env` 예시:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Render 배포용 예시:

```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

주의:

- `VITE_API_BASE_URL` 끝에 `/`를 붙이지 않아도 됩니다.
- 실제 `.env` 파일은 GitHub에 올리지 않습니다.
- GitHub에는 `frontend/.env.example`만 올립니다.

## 3. 백엔드 CORS 환경변수 설정

FastAPI 백엔드는 `FRONTEND_ORIGINS`로 허용할 프론트엔드 origin을 읽습니다.

로컬 + Render 프론트엔드를 함께 허용하는 예시:

```env
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000,https://your-frontend-service.onrender.com
```

주의:

- 쉼표로 여러 origin을 구분합니다.
- origin은 `https://도메인`까지만 적고 마지막 `/`는 생략하는 것이 좋습니다.
- `allow_origins=["*"]`는 사용하지 않습니다.

## 4. 프론트엔드 Dockerfile 설명

`frontend/Dockerfile`은 멀티 스테이지 빌드를 사용합니다.

1. `node:22-alpine` 단계에서 Vite 앱을 빌드합니다.
2. `nginx:1.27-alpine` 단계에서 `dist` 정적 파일을 서빙합니다.
3. Nginx는 `frontend/nginx.conf` 설정으로 SPA 라우팅을 지원합니다.
4. 컨테이너는 Render Web Service에서 사용할 수 있도록 `10000` 포트를 엽니다.

Render의 Docker 배포는 저장소의 Dockerfile을 직접 빌드할 수 있습니다. 이 프로젝트는 monorepo 구조이므로 프론트엔드 서비스의 Root Directory를 `frontend`로 설정합니다. Render는 Docker 서비스의 환경변수를 빌드 인자로도 사용할 수 있으므로, Vite 빌드 시 `VITE_API_BASE_URL`을 주입할 수 있습니다.

참고 문서:

- Render Docker 배포: https://render.com/docs/docker
- Render Web Services: https://render.com/docs/web-services
- Render Monorepo Support: https://render.com/docs/monorepo-support
- Render 환경변수: https://render.com/docs/environment-variables

## 5. Render 프론트엔드 Docker Web Service 배포 과정

1. Render Dashboard에 로그인합니다.
2. `New +` 버튼을 누릅니다.
3. `Web Service`를 선택합니다.
4. CareerFit AI GitHub 저장소를 연결합니다.
5. 서비스 이름을 입력합니다.
   - 예: `careerfit-frontend`
6. Runtime 또는 Language에서 `Docker`를 선택합니다.
7. Root Directory에 아래 값을 입력합니다.

```text
frontend
```

8. Dockerfile Path에 아래 값을 입력합니다.

```text
Dockerfile
```

9. Docker Build Context는 기본값을 사용합니다.
10. Environment Variables에 `VITE_API_BASE_URL`을 추가합니다.
11. Deploy를 실행합니다.

## 6. Render 환경변수 설정값

프론트엔드 Web Service:

```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

백엔드 Web Service:

```env
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000,https://your-frontend-service.onrender.com
GEMINI_API_KEY=your_real_gemini_api_key
```

OpenAI fallback을 사용하는 경우:

```env
OPENAI_API_KEY=your_real_openai_api_key
LLM_MODEL=gpt-4o-mini
```

## 7. 배포 후 확인 방법

백엔드 확인:

```text
https://your-backend-service.onrender.com/health
```

프론트엔드 확인:

```text
https://your-frontend-service.onrender.com
```

브라우저에서 확인할 것:

- 프론트엔드 화면이 뜨는가?
- 입력 폼에 전공, 스킬, 관심 직무를 입력할 수 있는가?
- 분석 요청 시 결과가 표시되는가?
- 브라우저 개발자 도구 Network 탭에서 백엔드 요청이 Render 백엔드 URL로 나가는가?

## 8. CORS 오류 해결 방법

CORS 오류가 나면 아래 순서로 확인합니다.

1. 프론트엔드 Render URL을 복사합니다.
2. 백엔드 Render 서비스의 `FRONTEND_ORIGINS`에 해당 URL이 들어 있는지 확인합니다.
3. URL 끝의 `/`를 제거합니다.
4. 쉼표 사이에 공백이나 잘못된 문자가 없는지 확인합니다.
5. 백엔드 서비스를 재배포합니다.
6. 브라우저 캐시를 새로고침합니다.

예:

```env
FRONTEND_ORIGINS=https://careerfit-frontend.onrender.com,http://localhost:5173,http://127.0.0.1:5173
```

## 9. Git에 올리면 안 되는 파일 목록

아래 파일과 폴더는 GitHub에 올리지 않습니다.

- `.env`
- `.env.*`
- `backend/.env`
- `frontend/.env`
- `node_modules/`
- `dist/`
- `.venv/`
- `venv/`
- `__pycache__/`
- `pycache/`
- 실제 API Key가 들어 있는 파일

GitHub에는 아래 example 파일만 올립니다.

- `backend/.env.example`
- `frontend/.env.example`
