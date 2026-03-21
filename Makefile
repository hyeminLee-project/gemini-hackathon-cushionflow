.PHONY: help dev build start lint typecheck install clean docker-build docker-up docker-down test test-e2e

help: ## 사용 가능한 명령어 목록
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

# ── 개발 ──────────────────────────────────────────
install: ## 의존성 설치
	bun install

dev: ## 개발 서버 실행 (localhost:3000)
	bun run dev

build: ## 프로덕션 빌드
	bun run build

start: ## 프로덕션 서버 실행
	bun run start

# ── 코드 품질 ──────────────────────────────────────
lint: ## ESLint 실행
	bun run lint

format: ## Prettier 포맷 적용
	bun run format

format-check: ## Prettier 포맷 검사
	bun run format:check

typecheck: ## TypeScript 타입 체크
	./node_modules/.bin/tsc --noEmit

test: ## 테스트 실행
	bun run test

test-e2e: ## E2E 테스트 실행
	bun run test:e2e

# ── Docker ────────────────────────────────────────
docker-build: ## Docker 이미지 빌드
	docker build -t cushionflow .

docker-up: ## Docker Compose로 실행
	docker compose up -d

docker-down: ## Docker Compose 중지
	docker compose down

# ── 정리 ──────────────────────────────────────────
clean: ## 빌드 산출물 및 캐시 삭제
	rm -rf .next node_modules
