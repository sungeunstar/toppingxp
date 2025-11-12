# ToppingXP

Vercel+Supabase 웹앱과 Windows Electron 위젯을 한 코드베이스에서 운영하는 모노레포 프로젝트입니다.

## 프로젝트 구조

```
toppingxp/
├── apps/
│   ├── web/          # Next.js 웹앱 (App Router + PWA)
│   └── widget/       # Electron 데스크톱 위젯
├── packages/
│   └── shared/       # 공통 유틸리티
└── .github/
    └── workflows/    # CI/CD 파이프라인
```

## 설정

### 1. 환경변수 설정

루트 디렉토리에 `.env` 파일을 생성하고 다음 값을 설정하세요:

```bash
# Vercel Production URL
VERCEL_PROD_URL=https://YOUR-APP.vercel.app

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
# 웹앱 개발 서버
npm run dev:web

# 위젯 개발 모드
npm run dev:widget
```

## 빌드

### 웹앱 빌드

```bash
npm run build:web
```

### 위젯 빌드

```bash
npm run build:widget
```

## 배포

### 웹앱 (Vercel)

1. Vercel에 프로젝트 연결
2. 환경변수 설정
3. `apps/web` 디렉토리를 루트로 설정
4. 자동 배포

### 위젯 (GitHub Releases)

1. Git 태그 생성: `git tag v1.0.0`
2. 태그 푸시: `git push origin v1.0.0`
3. GitHub Actions가 자동으로 빌드하고 릴리스 생성

## 기능

### 웹앱
- Next.js App Router
- PWA 지원 (Progressive Web App)
- Supabase 인증 연동 준비
- /download 페이지에서 위젯 다운로드 링크 제공

### 위젯
- 투명 창
- 프레임리스 디자인
- 항상 위에 표시
- 클릭스루 토글
- 시스템 트레이 아이콘
- Vercel 프로덕션 웹 로드

## 라이선스

MIT
