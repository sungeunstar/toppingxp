@echo off
echo 🔄 변경사항을 저장하고 푸시합니다...

REM 1. 변경된 파일 추가
git add .

REM 2. 커밋 (현재 시간 자동 삽입)
set now=%date% %time%
git commit -m "auto deploy: %now%"

REM 3. 푸시
git push origin main

echo ✅ 푸시 완료!
pause
