# Asset Commit Instructions

## 파일 확인
다음 파일들이 로컬에 있는지 확인하세요:

```
fonts/
  - DNFBitBitv2.ttf
  - DNFBitBitv2.woff2  (optional)
  - DNFBitBitv2.woff   (optional)

images/
  - background_landing.png
  - box.png
```

## Git 명령어

VS Code 터미널에서 다음 명령어들을 순서대로 실행하세요:

```bash
# 1. 현재 브랜치 확인
git status

# 2. 모든 asset 파일 추가
git add fonts/ images/

# 3. 커밋
git commit -m "Add DNFBitBitv2 font and landing page images"

# 4. 푸시
git push
```

## 다음 단계

1. **Pull Request 생성**: https://github.com/sungeunstar/toppingxp/pulls
   - Base branch: `main`
   - Compare branch: `claude/submenu-fix-tooltip-011CV39pkr9ok2CXe6K82nT4`

2. **PR 머지 후 새 릴리즈 생성**:
   ```bash
   git checkout main
   git pull
   git tag v1.2.0
   git push origin v1.2.0
   ```

## 포함된 변경사항

✅ 랜딩 페이지 (index.html)
  - 인터랙티브 게임 (타겟 박스 파괴)
  - DNFBitBitv2 픽셀 폰트
  - 레트로 픽셀아트 HP 바
  - 타겟 흔들림 이펙트
  - 로컬 이미지 지원

✅ 퀘스트 앱 (app.html)
  - 기존 index.html 복사

✅ 다운로드 페이지 (download.html)
  - GitHub Releases API 연동

✅ Electron 위젯
  - 기본 창 크기: 500x800
  - 햄버거 메뉴 with 창 크기 조절
  - 드래그 바 with 잠금/해제
  - 커스텀 스크롤바
