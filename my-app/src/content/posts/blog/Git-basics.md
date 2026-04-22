---
title: "Git 기초 가이드: 브랜치 전략부터 되돌리기까지"
date: "2025-04-21"
description: "분산 버전 관리 기본 개념, 자주 쓰는 명령, 브랜치 전략, 충돌/되돌리기 실무 팁"
---

### Git은 무엇인가

- 분산 버전 관리 시스템(Distributed VCS). 스냅샷(커밋) 단위로 코드 이력을 관리하고, 브랜치를 기반으로 안전하게 실험·협업한다.

### 핵심 개념

- **워킹 디렉토리/스테이징/리포지토리**: 수정 → `git add`(스테이징) → `git commit`(저장)
- **커밋/브랜치/태그**: 스냅샷과 포인터. `HEAD`는 현재 체크아웃한 커밋/브랜치를 가리킴
- **원격(remote)**: `origin` 등 서버 저장소. `fetch/pull/push`로 동기화

### 자주 쓰는 명령 모음

```bash
# 초기화/복제
git init
git clone <repo-url>

# 상태/이력/차이
git status
git log --oneline --graph --decorate --all
git diff          # 워킹 vs 스테이징
git diff --staged # 스테이징 vs 마지막 커밋

# 스테이징/커밋
git add -p        # 청크 단위 선택적 스테이징
git commit -m "feat: add user login"

# 브랜치 생성/이동/병합
git switch -c feat/login
git switch main
git merge feat/login         # 병합 커밋
git rebase main              # 선형 이력 만들기(로컬에서 신중히)

# 원격 동기화
git fetch                    # 원격 참조만 갱신
git pull --rebase            # 가져오며 로컬 위에 재배치
git push -u origin HEAD

# 임시 저장
git stash push -m "wip: refactor"
git stash pop

# 되돌리기
git restore <file>           # 워킹 디렉토리 되돌리기
git reset --mixed HEAD~1     # 마지막 커밋 취소+스테이징 해제(로컬 정리)
git reset --hard HEAD~1      # 강제 되돌림(주의)
git revert <commit>          # 공개 이력에서 안전한 되돌리기
```

### 브랜치 전략(협업)

- **Trunk-based**(추천): 보호된 `main` + 작은 기능 브랜치(PR). 빠른 병합·짧은 피드백 루프
- **Git Flow**: `develop/release/hotfix`가 분리된 큰 팀/릴리스 주기 긴 프로젝트에 적합
- 공통 원칙: 작은 PR, 명확한 커밋 메시지(Conventional Commits), 필수 리뷰/CI

### 충돌 관리 베스트 프랙티스

- 자주 **fetch/rebase**해 변경을 작게 유지
- 파일 단위가 아닌 **청크/함수 단위**로 수정 범위를 최소화
- 도구 활용: IDE 머지 도구, `git mergetool`
- 해결 후: `git add` → 테스트 통과 확인 → `git rebase --continue` 또는 커밋

### 되돌리기 선택 가이드

- 로컬 정리: `git reset`(mixed/hard)
- 공개 이력: `git revert`로 역커밋 생성(히스토리 보존)
- 실수 방지: 강제 푸시는 최소화, 보호 브랜치 정책 활용

### 품질과 자동화

- `.gitignore` 정리로 불필요 파일 제외
- 커밋 훅(Husky)으로 린트/테스트 자동화, CI에서 빌드·테스트 강제
- `git bisect`로 회귀 버그를 이분 탐색

### 마무리

- 작은 단위의 커밋/PR, 일관된 전략, 안전한 되돌리기 습관이 협업 생산성을 좌우한다. 팀 규모와 릴리스 주기에 맞춰 Trunk-based 또는 Git Flow를 선택하고, 자동화로 품질을 보장하자.
