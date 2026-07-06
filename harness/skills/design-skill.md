# CareerFit AI Design Skill

## 프로젝트 컨텍스트

CareerFit AI는 대학생을 위한 취업·공모전 포트폴리오 코치 서비스입니다.
React UI는 전문적인 커리어 분석 도구처럼 신뢰감을 주면서도, 대학생 사용자가 부담 없이 입력하고 결과를 이해할 수 있을 만큼 친근해야 합니다.

디자인 방향:

- 취업·공모전 준비에 어울리는 전문성
- 대학생 사용자를 위한 친근하고 명확한 화면
- AI 답변과 근거 출처가 분리된 신뢰 가능한 구조
- Tailwind CSS 기반의 일관된 스타일

## 컬러 팔레트

Tailwind CSS를 기준으로 하되, 아래 hex 값을 디자인 기준으로 사용합니다.

| 역할 | Hex | Tailwind 기준 | 의미 |
| --- | --- | --- | --- |
| primary | `#3B82F6` | `blue-500` | 파란색, 신뢰, 전문성 |
| secondary | `#10B981` | `emerald-500` | 초록색, 성장, 추천 |
| background | `#F8FAFC` | `slate-50` | 연한 회색 배경 |
| text-primary | `#1E293B` | `slate-800` | 주요 제목과 핵심 텍스트 |
| text-muted | `#64748B` | `slate-500` | 설명, 보조 정보 |
| border | `#E2E8F0` | `slate-200` | 카드, 입력창, 구분선 |
| error | `#EF4444` | `red-500` | 오류, 실패, 경고 상태 |

### 사용 규칙

- 주요 버튼과 핵심 액션은 `bg-blue-500 hover:bg-blue-600`을 사용합니다.
- 추천, 성장, AI 분석 결과 강조는 `emerald-500` 또는 `border-emerald-500`을 사용합니다.
- 전체 배경은 `bg-slate-50`을 사용합니다.
- 카드 배경은 `bg-white`를 사용합니다.
- 본문은 `text-slate-600`, 보조 설명은 `text-slate-500`을 사용합니다.
- 오류 메시지는 `bg-red-50 border-red-200 text-red-500` 조합을 사용합니다.

## 타이포그래피

### 제목

서비스명, 페이지의 가장 중요한 제목에 사용합니다.

```jsx
className="text-2xl font-bold text-slate-800"
```

### 소제목

입력 폼, 분석 결과, 출처 카드의 제목에 사용합니다.

```jsx
className="text-lg font-semibold text-slate-700"
```

### 본문

AI 답변, 공고 설명, 주요 안내 문장에 사용합니다.

```jsx
className="text-base text-slate-600"
```

### 설명

placeholder 보조 설명, 부가 정보, 작은 안내 텍스트에 사용합니다.

```jsx
className="text-sm text-slate-500"
```

### 문장 규칙

- 제목은 짧고 명확하게 작성합니다.
- 버튼 문구는 사용자의 행동을 드러내는 텍스트를 사용합니다.
- AI 답변은 긴 문장이 될 수 있으므로 `leading-relaxed`와 `whitespace-pre-line`을 함께 사용할 수 있습니다.
- 설명 텍스트는 본문보다 작고 약하게 표시합니다.

## 컴포넌트 구조

### App.jsx

역할:

- 최상위 컴포넌트
- 전체 레이아웃 구성
- 입력, 로딩, 성공, 오류 상태 관리
- 백엔드 API 요청 처리
- `InputForm`, `ResultCard`, `SourceCard` 렌더링

권장 구조:

```jsx
<main className="min-h-screen bg-slate-50 px-4 py-10">
  <section className="mx-auto max-w-2xl space-y-4">
    <header />
    <InputForm />
    <ResultCard />
    <SourceCard />
  </section>
</main>
```

### InputForm.jsx

역할:

- 전공 입력
- 보유 스킬 입력
- 관심 직무 입력
- 분석 요청 버튼 제공

권장 카드 스타일:

```jsx
className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
```

권장 입력 스타일:

```jsx
className="w-full rounded-lg border border-slate-200 px-3 py-2 text-base text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
```

권장 버튼 스타일:

```jsx
className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:bg-slate-300"
```

### ResultCard.jsx

역할:

- AI 분석 답변 출력
- 사용자의 전공·스킬·관심 직무에 맞춘 포트폴리오 조언 표시
- 초록 왼쪽 테두리로 분석 결과 영역을 강조

권장 스타일:

```jsx
className="rounded-xl border-l-4 border-emerald-500 bg-white p-6 shadow-sm"
```

내용 규칙:

- 답변은 `text-base text-slate-600`을 기준으로 표시합니다.
- 줄바꿈이 필요한 AI 답변은 `whitespace-pre-line`을 사용합니다.
- 결과가 비어 있으면 빈 카드 대신 안내 메시지를 표시합니다.

### SourceCard.jsx

역할:

- AI가 참고한 출처 공고 목록 출력
- 회사명, 공고명, 직무, 마감일 등 근거 데이터를 표시
- 사용자가 AI 답변의 근거를 확인할 수 있게 함

권장 스타일:

```jsx
className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
```

출처 아이템 스타일:

```jsx
className="border-b border-slate-200 pb-3 last:border-0 last:pb-0"
```

내용 규칙:

- 출처가 없으면 컴포넌트를 숨기지 말고 "참고한 공고 데이터가 없습니다."를 표시합니다.
- 실제 데이터에 없는 회사명, 직무, 마감일을 임의로 만들지 않습니다.

## 레이아웃 규칙

### 최대 너비

전체 주요 콘텐츠는 아래 규칙을 사용합니다.

```jsx
className="max-w-2xl mx-auto"
```

### 카드 내부 여백

모든 주요 카드의 내부 여백은 `p-6`을 기본으로 합니다.

```jsx
className="p-6"
```

### 컴포넌트 간격

컴포넌트 사이에는 `gap-4` 또는 `space-y-4`를 사용합니다.

```jsx
className="space-y-4"
```

또는 grid/flex 레이아웃에서는:

```jsx
className="gap-4"
```

### 모서리

- 카드: `rounded-xl`
- 버튼: `rounded-lg`
- 입력창: `rounded-lg`

### 화면 구성

- 전체 화면 배경은 `bg-slate-50`을 사용합니다.
- 카드 배경은 `bg-white`를 사용합니다.
- 모바일과 데스크톱 모두 한 컬럼 흐름을 기본으로 합니다.
- 입력 영역, 결과 영역, 출처 영역은 시각적으로 분리합니다.
- 에러와 로딩 상태는 사용자가 바로 볼 수 있는 위치에 표시합니다.

## 금지 사항

다음 패턴은 CareerFit AI UI에서 사용하지 않습니다.

- API Key를 화면에 표시하지 않습니다.
- API Key를 `localStorage`에 저장하지 않습니다.
- React 코드에 API Key를 직접 작성하지 않습니다.
- 다크 배경에 흰 텍스트 조합을 기본 UI로 사용하지 않습니다. 가독성을 우선합니다.
- 아이콘만 있는 버튼을 사용하지 않습니다. 버튼에는 반드시 텍스트 레이블이 있어야 합니다.
- 텍스트 레이블 없이 아이콘만으로 주요 액션을 표현하지 않습니다.
- 출처 공고 데이터를 숨기지 않습니다.
- 실제 데이터에 없는 회사명, 공고명, 합격 가능성을 만들어내지 않습니다.
- 오류 메시지를 콘솔에만 남기고 화면에 표시하지 않는 구조를 만들지 않습니다.
- 로딩 상태 없이 API 요청을 보내지 않습니다.
- label 없이 placeholder만 있는 입력 폼을 만들지 않습니다.
- `dangerouslySetInnerHTML`로 AI 답변을 렌더링하지 않습니다.

## 체크리스트

UI를 만들거나 수정한 뒤 아래 항목을 확인합니다.

- `primary`, `secondary`, `background`, `text`, `border`, `error` 색상이 일관되게 사용되었는가?
- 제목, 소제목, 본문, 설명의 Tailwind class가 규칙과 맞는가?
- `App`, `InputForm`, `ResultCard`, `SourceCard`의 역할이 분리되어 있는가?
- 전체 콘텐츠가 `max-w-2xl mx-auto` 안에 정리되어 있는가?
- 카드에는 `p-6`, `rounded-xl`이 적용되어 있는가?
- 버튼에는 `rounded-lg`와 명확한 텍스트 레이블이 있는가?
- 오류, 로딩, 빈 출처 상태가 화면에 표시되는가?
