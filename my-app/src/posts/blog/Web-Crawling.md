---
title: "웹 크롤링에 대해서"
date: "2025-11-23"
description: "웹 크롤링과 스크래핑의 기본 개념, 도구, 그리고 모범 사례에 대해 알아보자."
---

## 웹 크롤링이란?

웹 크롤링(Web Crawling)은 웹사이트에서 데이터를 자동으로 수집하는 과정이다. 크롤러(Crawler) 또는 스파이더(Spider)라고 불리는 프로그램이 웹 페이지를 방문하여 정보를 추출하고 저장한다. 웹 스크래핑(Web Scraping)과 유사하지만, 크롤링은 여러 페이지를 체계적으로 탐색하는 것을 의미하고, 스크래핑은 특정 페이지에서 데이터를 추출하는 것을 의미한다.

## 크롤링의 용도

1. **검색 엔진**

   - Google, Naver 같은 검색 엔진이 웹 페이지를 인덱싱
   - 웹사이트의 구조와 내용을 분석

2. **데이터 수집**

   - 가격 비교 사이트
   - 뉴스 기사 수집
   - 소셜 미디어 모니터링

3. **시장 조사**

   - 경쟁사 분석
   - 트렌드 파악
   - 고객 리뷰 수집

4. **연구 및 분석**

   - 학술 연구 데이터 수집
   - 통계 분석
   - 머신러닝 데이터셋 구축

## 크롤링 vs 스크래핑

| 항목   | 크롤링 (Crawling)              | 스크래핑 (Scraping)         |
| ------ | ------------------------------ | --------------------------- |
| 범위   | 여러 페이지를 체계적으로 탐색  | 특정 페이지에서 데이터 추출 |
| 목적   | 웹사이트 구조 파악, 인덱싱     | 특정 데이터 추출            |
| 예시   | 검색 엔진 봇                   | 상품 가격 추출              |
| 복잡도 | 높음 (링크 추적, 중복 방지 등) | 낮음 (단일 페이지 처리)     |

## 크롤링 도구와 라이브러리

### Java

#### Jsoup

```java
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

String url = "https://example.com";
Document doc = Jsoup.connect(url).get();

// 태그로 찾기
Element title = doc.selectFirst("h1");
System.out.println(title.text());

// 클래스로 찾기
Elements items = doc.select("div.item");
for (Element item : items) {
    System.out.println(item.text());
}
```

#### HttpClient (Java 11+)

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com"))
    .build();

HttpResponse<String> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofString()
);

String html = response.body();
```

#### Selenium

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

WebDriver driver = new ChromeDriver();
driver.get("https://example.com");

// 동적 콘텐츠 대기
WebDriverWait wait = new WebDriverWait(driver, 10);
WebElement element = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("content"))
);

// 데이터 추출
WebElement title = driver.findElement(By.cssSelector("h1"));
System.out.println(title.getText());

driver.quit();
```

### JavaScript/Node.js

#### Puppeteer

```javascript
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");

  // 데이터 추출
  const title = await page.$eval("h1", (el) => el.textContent);
  console.log(title);

  // 스크린샷
  await page.screenshot({ path: "screenshot.png" });

  await browser.close();
})();
```

#### Cheerio

```javascript
const cheerio = require("cheerio");
const axios = require("axios");

async function scrape() {
  const response = await axios.get("https://example.com");
  const $ = cheerio.load(response.data);

  // jQuery와 유사한 문법
  const title = $("h1").text();
  const items = $(".item")
    .map((i, el) => $(el).text())
    .get();

  console.log(title, items);
}
```

### 기타 도구

- **HtmlUnit**: Java 기반 헤드리스 브라우저
- **OkHttp**: HTTP 클라이언트 라이브러리
- **WebDriver**: Selenium WebDriver Java 바인딩
- **Apache HttpClient**: HTTP 통신 라이브러리

## 크롤링 기본 프로세스

### 1. 요청 전송

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newBuilder().build();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com"))
    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    .build();

HttpResponse<String> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofString()
);

System.out.println(response.statusCode()); // 200
System.out.println(response.body()); // HTML 내용
```

### 2. HTML 파싱

```java
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

String html = response.body();
Document doc = Jsoup.parse(html);

// 다양한 선택자 사용
Element title = doc.selectFirst("h1.title");
Elements items = doc.select("div.item");
```

### 3. 데이터 추출

```java
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

List<Map<String, String>> data = new ArrayList<>();

for (Element item : items) {
    String title = item.selectFirst("h2").text().trim();
    String price = item.selectFirst("span.price").text().trim();
    String link = item.selectFirst("a").attr("href");

    Map<String, String> itemData = new HashMap<>();
    itemData.put("title", title);
    itemData.put("price", price);
    itemData.put("link", link);

    data.add(itemData);
}
```

### 4. 데이터 저장

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

// JSON으로 저장
ObjectMapper mapper = new ObjectMapper();
mapper.enable(SerializationFeature.INDENT_OUTPUT);
mapper.writeValue(new File("data.json"), data);

// CSV로 저장
try (FileWriter writer = new FileWriter("data.csv")) {
    writer.append("title,price,link\n");
    for (Map<String, String> item : data) {
        writer.append(item.get("title"))
              .append(",")
              .append(item.get("price"))
              .append(",")
              .append(item.get("link"))
              .append("\n");
    }
}
```

## 고급 크롤링 기법

### 동적 콘텐츠 처리

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;

WebDriver driver = new ChromeDriver();
driver.get("https://example.com");

// JavaScript 실행 대기
WebDriverWait wait = new WebDriverWait(driver, 10);
WebElement element = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("dynamic-content"))
);

// 스크롤하여 더 많은 콘텐츠 로드
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
```

### 세션 관리 및 쿠키

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.net.http.HttpClient.Builder;
import java.net.CookieManager;
import java.net.CookieHandler;

// CookieManager로 쿠키 관리
CookieManager cookieManager = new CookieManager();
CookieHandler.setDefault(cookieManager);

HttpClient client = HttpClient.newBuilder()
    .cookieHandler(cookieManager)
    .build();

// 로그인
String loginData = "username=user&password=pass";
HttpRequest loginRequest = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com/login"))
    .header("Content-Type", "application/x-www-form-urlencoded")
    .POST(HttpRequest.BodyPublishers.ofString(loginData))
    .build();

client.send(loginRequest, HttpResponse.BodyHandlers.ofString());

// 쿠키가 자동으로 유지됨
HttpRequest dashboardRequest = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com/dashboard"))
    .build();

HttpResponse<String> response = client.send(
    dashboardRequest,
    HttpResponse.BodyHandlers.ofString()
);
```

### 요청 간격 조절

```java
import java.util.List;
import java.util.Random;

public void crawlWithDelay(List<String> urls) throws InterruptedException {
    Random random = new Random();

    for (String url : urls) {
        // HTTP 요청 수행
        HttpResponse<String> response = sendRequest(url);
        processResponse(response);

        // 1-3초 사이 랜덤 대기
        int delay = 1000 + random.nextInt(2000); // 1000-3000ms
        Thread.sleep(delay);
    }
}
```

### 에러 처리 및 재시도

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.util.List;

public HttpResponse<String> sendRequestWithRetry(String url, int maxRetries) {
    List<Integer> retryStatusCodes = List.of(429, 500, 502, 503, 504);
    int attempt = 0;

    while (attempt < maxRetries) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

            HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );

            if (!retryStatusCodes.contains(response.statusCode())) {
                return response;
            }
        } catch (Exception e) {
            // 로그 기록
        }

        attempt++;
        try {
            Thread.sleep(1000 * attempt); // 지수 백오프
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    throw new RuntimeException("Max retries exceeded");
}
```

## robots.txt 준수

### robots.txt 확인

```java
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RobotsTxtChecker {
    public boolean canFetch(String userAgent, String url) {
        try {
            String robotsUrl = getBaseUrl(url) + "/robots.txt";
            Document doc = Jsoup.connect(robotsUrl).get();
            String robotsContent = doc.text();

            // robots.txt 파싱 로직 구현
            // 또는 crawler-commons 라이브러리 사용
            return parseRobotsTxt(robotsContent, userAgent, url);
        } catch (Exception e) {
            // robots.txt가 없으면 기본적으로 허용
            return true;
        }
    }

    private String getBaseUrl(String url) {
        // URL에서 기본 도메인 추출
        Pattern pattern = Pattern.compile("https?://([^/]+)");
        Matcher matcher = pattern.matcher(url);
        if (matcher.find()) {
            return "https://" + matcher.group(1);
        }
        return url;
    }
}

// 사용 예시
RobotsTxtChecker checker = new RobotsTxtChecker();
boolean canFetch = checker.canFetch("MyBot", "https://example.com/page");
System.out.println(canFetch); // true or false
```

### robots.txt 예시

```
User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/

Crawl-delay: 1
```

## 법적 및 윤리적 고려사항

### 1. **robots.txt 준수**

- 웹사이트의 robots.txt 파일 확인
- 금지된 경로는 크롤링하지 않기

### 2. **이용약관 확인**

- 웹사이트의 이용약관 검토
- 크롤링이 금지되어 있는지 확인

### 3. **저작권 존중**

- 수집한 데이터의 저작권 확인
- 상업적 이용 시 라이선스 확인

### 4. **서버 부하 고려**

- 적절한 요청 간격 유지
- 동시 요청 수 제한
- 캐싱 활용

### 5. **개인정보 보호**

- 개인정보 수집 시 법적 요구사항 준수
- GDPR, 개인정보보호법 등 고려

## 크롤링 방지 기법과 우회

### 크롤링 방지 기법

1. **User-Agent 검증**
2. **IP 기반 차단**
3. **CAPTCHA**
4. **JavaScript 렌더링 필요**
5. **Rate Limiting**

### 우회 방법 (윤리적 범위 내)

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.net.InetSocketAddress;
import java.net.Proxy;

// User-Agent 설정
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(url))
    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    .build();

// 프록시 사용
Proxy proxy = new Proxy(
    Proxy.Type.HTTP,
    new InetSocketAddress("proxy.example.com", 8080)
);

HttpClient client = HttpClient.newBuilder()
    .proxy(proxy)
    .build();

HttpResponse<String> response = client.send(
    request,
    HttpResponse.BodyHandlers.ofString()
);

// 쿠키 및 세션 관리
CookieManager cookieManager = new CookieManager();
HttpClient sessionClient = HttpClient.newBuilder()
    .cookieHandler(cookieManager)
    .build();
```

## 실전 예제: 뉴스 기사 크롤링

```java
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NewsCrawler {
    public List<Map<String, String>> crawlNews(String url) throws Exception {
        Document doc = Jsoup.connect(url)
            .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            .get();

        List<Map<String, String>> articles = new ArrayList<>();

        // 기사 목록 추출
        Elements newsItems = doc.select("div.news-item");

        for (Element item : newsItems) {
            String title = item.selectFirst("h2").text().trim();
            String link = item.selectFirst("a").attr("href");
            String date = item.selectFirst("span.date").text().trim();

            Map<String, String> article = new HashMap<>();
            article.put("title", title);
            article.put("link", link);
            article.put("date", date);

            articles.add(article);
        }

        return articles;
    }

    public static void main(String[] args) throws Exception {
        NewsCrawler crawler = new NewsCrawler();
        List<Map<String, String>> allArticles = new ArrayList<>();

        // 여러 페이지 크롤링
        for (int page = 1; page <= 5; page++) {
            String url = "https://example.com/news?page=" + page;
            List<Map<String, String>> articles = crawler.crawlNews(url);
            allArticles.addAll(articles);

            Thread.sleep(1000); // 서버 부하 방지
        }

        // JSON으로 저장
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        mapper.writeValue(new File("news.json"), allArticles);
    }
}
```

## 성능 최적화

### 비동기 크롤링

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

public class AsyncCrawler {
    public List<String> crawlAsync(List<String> urls) {
        HttpClient client = HttpClient.newHttpClient();

        List<CompletableFuture<String>> futures = urls.stream()
            .map(url -> {
                HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .build();

                return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenApply(HttpResponse::body);
            })
            .collect(Collectors.toList());

        return futures.stream()
            .map(CompletableFuture::join)
            .collect(Collectors.toList());
    }
}
```

### 멀티스레딩

```java
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.ArrayList;

public class MultiThreadCrawler {
    public List<String> crawlPages(List<String> urls) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(5);
        List<Future<String>> futures = new ArrayList<>();

        for (String url : urls) {
            Future<String> future = executor.submit(() -> {
                // HTTP 요청 및 데이터 처리
                return sendRequest(url);
            });
            futures.add(future);
        }

        List<String> results = new ArrayList<>();
        for (Future<String> future : futures) {
            results.add(future.get());
        }

        executor.shutdown();
        return results;
    }
}
```

## 데이터 정제 및 처리

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class DataCleaner {
    public String cleanText(String text) {
        // HTML 태그 제거
        text = text.replaceAll("<[^>]+>", "");

        // 공백 정리
        text = text.replaceAll("\\s+", " ").trim();

        // 특수 문자 제거
        text = text.replaceAll("[^\\w\\s]", "");

        return text.trim();
    }

    public LocalDate parseDate(String dateString) {
        String[] formats = {
            "yyyy-MM-dd",
            "dd/MM/yyyy",
            "MMMM d, yyyy"
        };

        for (String format : formats) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
                return LocalDate.parse(dateString, formatter);
            } catch (DateTimeParseException e) {
                // 다음 형식 시도
            }
        }
        return null;
    }
}
```

## 모범 사례

1. **요청 간격 유지**

   - 서버 부하를 줄이기 위해 적절한 딜레이 추가
   - `Thread.sleep()` 사용

2. **에러 처리**

   - 네트워크 오류, 타임아웃 등 예외 상황 처리
   - 재시도 로직 구현
   - try-catch 블록으로 예외 처리

3. **캐싱 활용**

   - 동일한 페이지를 여러 번 요청하지 않도록 캐싱
   - `Caffeine` 또는 `EhCache` 같은 캐싱 라이브러리 활용

4. **로깅**

   - 크롤링 과정을 로그로 기록
   - SLF4J + Logback 같은 로깅 프레임워크 사용
   - 디버깅과 모니터링에 유용

5. **데이터 검증**

   - 수집한 데이터의 유효성 검사
   - 예상과 다른 구조에 대비
   - null 체크 및 예외 처리

## 주의사항

1. **법적 리스크**

   - 크롤링이 불법이 될 수 있는 경우가 있음
   - 이용약관과 저작권법 확인 필수

2. **기술적 제한**

   - JavaScript로 렌더링되는 콘텐츠는 Selenium/WebDriver 필요
   - CAPTCHA나 복잡한 인증은 우회 어려움
   - HtmlUnit 같은 헤드리스 브라우저 사용 고려

3. **데이터 품질**

   - 웹사이트 구조 변경 시 크롤러 수정 필요
   - 불완전하거나 오래된 데이터 가능성

4. **서버 부하**

   - 과도한 요청은 서버에 부담
   - IP 차단 위험

## 결론

웹 크롤링은 유용한 데이터 수집 방법이지만, 법적·윤리적 고려사항을 반드시 준수해야 한다. robots.txt를 확인하고, 적절한 요청 간격을 유지하며, 웹사이트의 이용약관을 존중하는 것이 중요하다. 올바른 도구와 기법을 사용하면 효율적으로 데이터를 수집할 수 있지만, 항상 책임감 있게 크롤링해야 한다.
