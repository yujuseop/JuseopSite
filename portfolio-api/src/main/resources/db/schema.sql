-- ============================================================
-- Portfolio API - Schema
-- ============================================================

-- A. 포트폴리오 데이터

CREATE TABLE IF NOT EXISTS skill_categories (
    id          VARCHAR(50) PRIMARY KEY,
    title       VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
    id          SERIAL PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    level       INT DEFAULT 3,
    description TEXT,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
    id           SERIAL PRIMARY KEY,
    slug         VARCHAR(100) UNIQUE NOT NULL,
    emoji        VARCHAR(10),
    title        VARCHAR(300) NOT NULL,
    summary      TEXT,
    description  TEXT,
    participants VARCHAR(200),
    duration     VARCHAR(100),
    demo_url     VARCHAR(500),
    repo_url     VARCHAR(500),
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS project_tech_stacks (
    id          SERIAL PRIMARY KEY,
    project_id  INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    tech_name   VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS project_highlights (
    id          SERIAL PRIMARY KEY,
    project_id  INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experiences (
    id              SERIAL PRIMARY KEY,
    company         VARCHAR(200) NOT NULL,
    emoji           VARCHAR(10),
    role            VARCHAR(200),
    employment_type VARCHAR(50),
    period          VARCHAR(100),
    summary         TEXT,
    team            VARCHAR(200),
    display_order   INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience_tech_stacks (
    id            SERIAL PRIMARY KEY,
    experience_id INT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    tech_name     VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience_highlights (
    id            SERIAL PRIMARY KEY,
    experience_id INT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    title         VARCHAR(300) NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience_highlight_details (
    id           SERIAL PRIMARY KEY,
    highlight_id INT NOT NULL REFERENCES experience_highlights(id) ON DELETE CASCADE,
    content      TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- B. 댓글 (slug 기반, posts 테이블 불필요)

CREATE TABLE IF NOT EXISTS comments (
    id          SERIAL PRIMARY KEY,
    slug        VARCHAR(200) NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- C. 연락처

CREATE TABLE IF NOT EXISTS contact_messages (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(200) NOT NULL,
    message    TEXT NOT NULL,
    is_read    BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_comments_slug ON comments(slug);
