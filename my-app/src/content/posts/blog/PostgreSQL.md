---
title: "PostgreSQL에 대하여"
date: "2025-12-06"
description: "안정적이고 강력한 오픈소스 DB"
---

## PostgreSQL이란?

PostgreSQL은 세계에서 가장 고급 오픈소스 관계형 데이터베이스 관리 시스템(RDBMS)이다. 1986년부터 개발되어 온 안정적이고 강력한 데이터베이스로, 엔터프라이즈급 기능을 무료로 제공한다. "Postgres"라고도 불리며, SQL 표준을 잘 준수하고 다양한 데이터 타입과 기능을 지원한다.

## PostgreSQL의 특징

1. **오픈소스**

   - 완전 무료로 사용 가능
   - 상업적 용도에도 제한 없음
   - 활발한 커뮤니티 지원

2. **고급 기능**

   - JSON, 배열, 범위 등 다양한 데이터 타입
   - Full-text 검색
   - 확장 가능한 아키텍처

3. **안정성과 성능**

   - ACID 트랜잭션 보장
   - 동시성 제어
   - 뛰어난 성능

4. **크로스 플랫폼**

   - Windows, Linux, macOS 지원
   - 다양한 프로그래밍 언어와 연동

## 설치

### Windows

1. PostgreSQL 공식 사이트에서 설치 파일 다운로드
2. 설치 마법사 따라하기
3. 설치 중 비밀번호 설정 (postgres 사용자)

### macOS

```bash
# Homebrew 사용
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## 기본 사용법

### 데이터베이스 접속

```bash
# psql 명령어로 접속
psql -U postgres

# 특정 데이터베이스에 접속
psql -U postgres -d mydb
```

### 기본 명령어

```sql
-- 데이터베이스 목록 보기
\l

-- 현재 데이터베이스 확인
SELECT current_database();

-- 테이블 목록 보기
\dt

-- 테이블 구조 보기
\d 테이블명

-- psql 종료
\q
```

## 데이터베이스 생성 및 관리

### 데이터베이스 생성

```sql
-- 데이터베이스 생성
CREATE DATABASE mydb;

-- 데이터베이스 삭제
DROP DATABASE mydb;

-- 데이터베이스 목록 확인
SELECT datname FROM pg_database;
```

### 사용자 생성 및 권한

```sql
-- 사용자 생성
CREATE USER myuser WITH PASSWORD 'mypassword';

-- 데이터베이스 권한 부여
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- 사용자에게 모든 권한 부여
ALTER USER myuser WITH SUPERUSER;
```

## 테이블 생성

### 기본 테이블 생성

```sql
-- 테이블 생성
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 주요 데이터 타입

| 타입         | 설명             | 예시                  |
| ------------ | ---------------- | --------------------- |
| INTEGER      | 정수             | 123                   |
| VARCHAR(n)   | 가변 길이 문자열 | 'Hello'               |
| TEXT         | 긴 텍스트        | 'Long text...'        |
| BOOLEAN      | 참/거짓          | TRUE, FALSE           |
| DATE         | 날짜             | '2025-12-06'          |
| TIMESTAMP    | 날짜와 시간      | '2025-12-06 10:30:00' |
| DECIMAL(p,s) | 고정 소수점 숫자 | 99.99                 |
| JSON         | JSON 데이터      | '{"key": "value"}'    |
| ARRAY        | 배열             | ARRAY[1, 2, 3]        |

### 제약 조건

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,                    -- 기본 키
    name VARCHAR(100) NOT NULL,               -- NULL 불가
    price DECIMAL(10, 2) CHECK (price > 0),  -- 체크 제약
    category_id INTEGER REFERENCES categories(id),  -- 외래 키
    code VARCHAR(50) UNIQUE                   -- 고유값
);
```

## 데이터 조작 (CRUD)

### INSERT - 데이터 삽입

```sql
-- 단일 행 삽입
INSERT INTO users (name, email, age)
VALUES ('홍길동', 'hong@example.com', 25);

-- 여러 행 한 번에 삽입
INSERT INTO users (name, email, age)
VALUES
    ('김철수', 'kim@example.com', 30),
    ('이영희', 'lee@example.com', 28);

-- 기본값 사용
INSERT INTO users (name, email)
VALUES ('박민수', 'park@example.com');
```

### SELECT - 데이터 조회

```sql
-- 모든 데이터 조회
SELECT * FROM users;

-- 특정 컬럼만 조회
SELECT name, email FROM users;

-- 조건 검색
SELECT * FROM users WHERE age > 25;

-- 정렬
SELECT * FROM users ORDER BY age DESC;

-- 개수 제한
SELECT * FROM users LIMIT 10;

-- 중복 제거
SELECT DISTINCT age FROM users;
```

### UPDATE - 데이터 수정

```sql
-- 단일 행 수정
UPDATE users
SET age = 26
WHERE id = 1;

-- 여러 컬럼 수정
UPDATE users
SET age = 27, email = 'newemail@example.com'
WHERE id = 1;

-- 조건에 맞는 모든 행 수정
UPDATE users
SET age = age + 1
WHERE age < 30;
```

### DELETE - 데이터 삭제

```sql
-- 특정 행 삭제
DELETE FROM users WHERE id = 1;

-- 조건에 맞는 모든 행 삭제
DELETE FROM users WHERE age < 18;

-- 모든 데이터 삭제 (주의!)
DELETE FROM users;
```

## 조인 (JOIN)

### INNER JOIN

```sql
-- 두 테이블의 공통 데이터만 조회
SELECT users.name, orders.order_date, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

### LEFT JOIN

```sql
-- 왼쪽 테이블의 모든 데이터 + 오른쪽 테이블의 매칭 데이터
SELECT users.name, orders.order_date
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

### RIGHT JOIN

```sql
-- 오른쪽 테이블의 모든 데이터 + 왼쪽 테이블의 매칭 데이터
SELECT users.name, orders.order_date
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
```

## 집계 함수

```sql
-- 개수
SELECT COUNT(*) FROM users;

-- 합계
SELECT SUM(price) FROM products;

-- 평균
SELECT AVG(age) FROM users;

-- 최대값
SELECT MAX(price) FROM products;

-- 최소값
SELECT MIN(age) FROM users;

-- 그룹별 집계
SELECT category, COUNT(*), AVG(price)
FROM products
GROUP BY category;
```

## 인덱스

인덱스는 데이터 검색 속도를 향상시킵니다.

```sql
-- 인덱스 생성
CREATE INDEX idx_user_email ON users(email);

-- 복합 인덱스
CREATE INDEX idx_user_name_age ON users(name, age);

-- 인덱스 확인
\d users

-- 인덱스 삭제
DROP INDEX idx_user_email;
```

## 트랜잭션

트랜잭션은 여러 작업을 하나의 단위로 묶어서 모두 성공하거나 모두 실패하도록 합니다.

```sql
-- 트랜잭션 시작
BEGIN;

-- 작업 수행
INSERT INTO users (name, email) VALUES ('사용자1', 'user1@example.com');
UPDATE accounts SET balance = balance - 1000 WHERE user_id = 1;

-- 커밋 (변경사항 저장)
COMMIT;

-- 롤백 (변경사항 취소)
ROLLBACK;
```

## 뷰 (View)

뷰는 가상의 테이블로, 복잡한 쿼리를 간단하게 사용할 수 있게 합니다.

```sql
-- 뷰 생성
CREATE VIEW user_orders AS
SELECT
    users.name,
    orders.order_date,
    orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- 뷰 사용
SELECT * FROM user_orders;

-- 뷰 삭제
DROP VIEW user_orders;
```

## 저장 프로시저

복잡한 로직을 데이터베이스에 저장하여 재사용할 수 있습니다.

```sql
-- 함수 생성
CREATE OR REPLACE FUNCTION get_user_count()
RETURNS INTEGER AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM users);
END;
$$ LANGUAGE plpgsql;

-- 함수 호출
SELECT get_user_count();

-- 매개변수가 있는 함수
CREATE OR REPLACE FUNCTION get_user_by_age(min_age INTEGER)
RETURNS TABLE(name VARCHAR, age INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT users.name, users.age
    FROM users
    WHERE users.age >= min_age;
END;
$$ LANGUAGE plpgsql;

-- 함수 호출
SELECT * FROM get_user_by_age(25);
```

## 트리거

특정 이벤트가 발생했을 때 자동으로 실행되는 함수입니다.

```sql
-- 트리거 함수 생성
CREATE OR REPLACE FUNCTION update_modified_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
CREATE TRIGGER update_user_modified_time
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_modified_time();
```

## 백업 및 복원

### 백업

```bash
# 전체 데이터베이스 백업
pg_dump -U postgres mydb > backup.sql

# 특정 테이블만 백업
pg_dump -U postgres -t users mydb > users_backup.sql

# 압축 백업
pg_dump -U postgres mydb | gzip > backup.sql.gz
```

### 복원

```bash
# SQL 파일로 복원
psql -U postgres mydb < backup.sql

# 압축 파일 복원
gunzip -c backup.sql.gz | psql -U postgres mydb
```

## 성능 최적화

### EXPLAIN 사용

```sql
-- 쿼리 실행 계획 확인
EXPLAIN SELECT * FROM users WHERE age > 25;

-- 실제 실행 시간 포함
EXPLAIN ANALYZE SELECT * FROM users WHERE age > 25;
```

### 인덱스 활용

```sql
-- 자주 검색하는 컬럼에 인덱스 생성
CREATE INDEX idx_users_age ON users(age);

-- 복합 조건 검색을 위한 인덱스
CREATE INDEX idx_users_name_email ON users(name, email);
```

## PostgreSQL vs MySQL

| 항목        | PostgreSQL                | MySQL            |
| ----------- | ------------------------- | ---------------- |
| 라이선스    | 오픈소스 (BSD)            | 오픈소스 (GPL)   |
| 데이터 타입 | 매우 다양 (JSON, 배열 등) | 기본 타입 위주   |
| 트랜잭션    | 완벽 지원                 | InnoDB에서 지원  |
| 성능        | 복잡한 쿼리에 유리        | 단순 쿼리에 빠름 |
| 확장성      | 뛰어남                    | 보통             |
| 사용 난이도 | 중급 이상                 | 초급부터 가능    |

## 자주 사용하는 명령어 정리

```sql
-- 데이터베이스
CREATE DATABASE dbname;
DROP DATABASE dbname;
\l  -- 목록 보기

-- 테이블
CREATE TABLE tablename (...);
DROP TABLE tablename;
\dt  -- 목록 보기
\d tablename  -- 구조 보기

-- 데이터
INSERT INTO table VALUES (...);
SELECT * FROM table;
UPDATE table SET ... WHERE ...;
DELETE FROM table WHERE ...;

-- 인덱스
CREATE INDEX idx_name ON table(column);
DROP INDEX idx_name;

-- 사용자
CREATE USER username WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE dbname TO username;
```

## 모범 사례

1. **적절한 데이터 타입 선택**

   - 필요한 크기에 맞는 타입 사용
   - VARCHAR 대신 TEXT는 긴 텍스트에만 사용

2. **인덱스 전략**

   - 자주 검색하는 컬럼에 인덱스 생성
   - 너무 많은 인덱스는 성능 저하

3. **트랜잭션 사용**

   - 관련된 여러 작업은 트랜잭션으로 묶기
   - 불필요하게 긴 트랜잭션은 피하기

4. **정규화**

   - 데이터 중복 최소화
   - 적절한 정규화 수준 유지

5. **백업**

   - 정기적인 백업 수행
   - 백업 파일 검증

## 결론

PostgreSQL은 강력하고 안정적인 오픈소스 데이터베이스로, 작은 프로젝트부터 대규모 엔터프라이즈 애플리케이션까지 다양한 용도로 사용할 수 있다. 풍부한 기능과 뛰어난 성능, 그리고 활발한 커뮤니티 지원으로 많은 개발자들이 선택하는 데이터베이스이다. 기본적인 SQL 문법을 익히고, 점진적으로 고급 기능을 학습하면 효과적으로 활용할 수 있다.
