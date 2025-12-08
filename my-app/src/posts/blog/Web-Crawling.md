---
title: "웹 크롤링에 대해서"
date: "2025-11-23"
description: "웹 크롤링과 스크래핑의 기본 개념, 도구, 그리고 모범 사례에 대해 알아보자."
---

## 웹 크롤링이란?

웹 크롤링(Web Crawling)은 웹사이트에서 데이터를 자동으로 수집하는 과정이다. 쉽게 말해, 사람이 웹사이트를 하나씩 방문해서 정보를 복사하는 대신, 프로그램이 자동으로 여러 웹페이지를 방문하여 필요한 정보를 수집하는 것이다.

**간단한 비유**: 책을 읽으면서 중요한 내용을 노트에 적는 것처럼, 크롤러는 웹사이트를 읽으면서 필요한 데이터를 자동으로 수집한다.

크롤러(Crawler) 또는 스파이더(Spider)라고 불리는 프로그램이 웹 페이지를 방문하여 정보를 추출하고 저장한다. 웹 스크래핑(Web Scraping)과 유사하지만, 크롤링은 여러 페이지를 체계적으로 탐색하는 것을 의미하고, 스크래핑은 특정 페이지에서 데이터를 추출하는 것을 의미한다.

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

크롤링과 스크래핑은 비슷해 보이지만 차이가 있다.

**크롤링**: 여러 페이지를 자동으로 돌아다니며 데이터를 수집 (예: 검색 엔진이 모든 웹페이지를 탐색)
**스크래핑**: 특정 페이지에서만 데이터를 추출 (예: 쇼핑몰에서 상품 가격만 가져오기)

| 항목   | 크롤링 (Crawling)              | 스크래핑 (Scraping)         |
| ------ | ------------------------------ | --------------------------- |
| 범위   | 여러 페이지를 체계적으로 탐색  | 특정 페이지에서 데이터 추출 |
| 목적   | 웹사이트 구조 파악, 인덱싱     | 특정 데이터 추출            |
| 예시   | 검색 엔진 봇                   | 상품 가격 추출              |
| 복잡도 | 높음 (링크 추적, 중복 방지 등) | 낮음 (단일 페이지 처리)     |

**초보자 팁**: 처음에는 스크래핑(한 페이지에서만 데이터 추출)부터 시작하는 것이 좋다.

## 크롤링 도구와 라이브러리

크롤링을 하려면 프로그래밍 언어와 도구가 필요하다. Java를 사용한다면 아래 도구들을 사용할 수 있다.

### Java

#### Jsoup

HTML을 파싱하고 데이터를 추출하는 가장 간단한 방법이다. **파싱(Parsing)**이란 HTML 코드를 읽어서 원하는 부분을 찾는 것을 의미한다.

**언제 사용하나?**: 정적인 HTML 페이지에서 데이터를 추출할 때 사용한다.

```java
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class JsoupExample {
    public static void main(String[] args) {
        try {
            // 웹 페이지 연결 및 HTML 가져오기
            String url = "https://example.com";
            Document doc = Jsoup.connect(url).get();

            // 첫 번째 요소 찾기
            Element title = doc.selectFirst("h1");
            if (title != null) {
                System.out.println("제목: " + title.text());
            }

            // 여러 요소 찾기 (class가 "item"인 div)
            Elements items = doc.select("div.item");
            for (Element item : items) {
                System.out.println("아이템: " + item.text());
            }

        } catch (Exception e) {
            System.err.println("오류: " + e.getMessage());
        }
    }
}
```

#### HttpClient (Java 11+)

Java에 내장된 HTTP 클라이언트로 별도 라이브러리 없이 사용할 수 있다. **HTTP 클라이언트**는 웹 서버에 요청을 보내고 응답을 받는 도구다.

**언제 사용하나?**: 웹페이지의 HTML을 가져올 때 사용한다. Jsoup과 함께 사용하면 완벽하다.

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class HttpClientExample {
    public static void main(String[] args) {
        try {
            // HTTP 클라이언트 생성
            HttpClient client = HttpClient.newHttpClient();

            // 요청 생성
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://example.com"))
                .build();

            // 요청 보내기 및 응답 받기
            HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );

            // 응답 확인
            System.out.println("상태 코드: " + response.statusCode());
            System.out.println("HTML 길이: " + response.body().length() + " 문자");

        } catch (Exception e) {
            System.err.println("오류: " + e.getMessage());
        }
    }
}
```

#### Selenium

실제 브라우저를 자동으로 제어하여 JavaScript로 생성되는 동적 콘텐츠도 크롤링할 수 있다.

**동적 콘텐츠란?**: 페이지를 열었을 때 JavaScript가 실행되면서 나중에 나타나는 내용을 말한다. 예를 들어, 스크롤을 내려야 보이는 상품 목록 같은 것들이다.

**언제 사용하나?**:

- JavaScript로 데이터가 로드되는 페이지
- 버튼을 클릭해야 내용이 나타나는 페이지
- 스크롤해야 더 많은 데이터가 로드되는 페이지

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class SeleniumExample {
    public static void main(String[] args) {
        WebDriver driver = null;
        try {
            // Chrome 브라우저 실행
            driver = new ChromeDriver();
            driver.get("https://example.com");

            // 동적 콘텐츠 대기 (최대 10초)
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            wait.until(ExpectedConditions.presenceOfElementLocated(By.id("content")));

            // 데이터 추출
            WebElement title = driver.findElement(By.cssSelector("h1"));
            System.out.println("제목: " + title.getText());

        } catch (Exception e) {
            System.err.println("오류: " + e.getMessage());
        } finally {
            if (driver != null) {
                driver.quit(); // 브라우저 종료
            }
        }
    }
}
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

크롤링은 크게 4단계로 이루어진다. 각 단계를 이해하면 크롤링의 전체 흐름을 파악할 수 있다.

### 1. 요청 전송

웹 페이지에 HTTP 요청을 보내서 HTML을 받아온다.

**이해하기**: 브라우저 주소창에 URL을 입력하고 엔터를 누르는 것과 같다. 프로그램이 대신 웹서버에 "이 페이지 주세요"라고 요청하는 것이다.

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class RequestExample {
    public static void main(String[] args) {
        try {
            // HTTP 클라이언트 생성
            HttpClient client = HttpClient.newBuilder().build();

            // 요청 생성 (User-Agent 설정으로 크롤러 차단 방지)
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://example.com"))
                .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                .build();

            // 요청 보내기
            HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );

            // 응답 확인
            System.out.println("상태 코드: " + response.statusCode());
            if (response.statusCode() == 200) {
                System.out.println("HTML 길이: " + response.body().length() + " 문자");
            }

        } catch (Exception e) {
            System.err.println("오류: " + e.getMessage());
        }
    }
}
```

### 2. HTML 파싱

HTML 문자열을 Jsoup으로 파싱하여 원하는 데이터를 찾을 수 있게 한다.

**이해하기**: 받아온 HTML은 그냥 긴 문자열이다. 파싱은 이 문자열을 분석해서 "여기가 제목이고, 여기가 본문이구나"라고 이해할 수 있게 만드는 과정이다.

**CSS 선택자**: HTML에서 원하는 요소를 찾기 위해 사용한다.

- `"h1"` → 모든 h1 태그
- `"div.item"` → class가 "item"인 div 태그
- `"#id"` → id가 "id"인 요소

```java
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class ParsingExample {
    public static void main(String[] args) {
        try {
            // HTML 문자열 (실제로는 response.body() 사용)
            String html = "<html><body>" +
                         "<h1 class='title'>웹 크롤링 예제</h1>" +
                         "<div class='item'>아이템 1</div>" +
                         "<div class='item'>아이템 2</div>" +
                         "</body></html>";

            // HTML 파싱
            Document doc = Jsoup.parse(html);

            // 첫 번째 요소 찾기 (class가 "title"인 h1)
            Element title = doc.selectFirst("h1.title");
            if (title != null) {
                System.out.println("제목: " + title.text());
            }

            // 여러 요소 찾기 (class가 "item"인 div)
            Elements items = doc.select("div.item");
            for (Element item : items) {
                System.out.println("아이템: " + item.text());
            }

        } catch (Exception e) {
            System.err.println("오류: " + e.getMessage());
        }
    }
}
```

### 3. 데이터 추출

HTML에서 필요한 정보를 추출하여 구조화된 데이터로 만든다.

**이해하기**: 파싱한 HTML에서 "이 부분은 제목, 이 부분은 가격"처럼 필요한 정보만 골라내는 것이다. 추출한 데이터는 Map이나 List 같은 자료구조에 저장한다.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class DataExtractionExample {
    public static void main(String[] args) {
        try {
            // 실제로는 doc.select("div.product-item") 등으로 가져옴
            Elements items = null;

            // 데이터 저장할 리스트
            List<Map<String, String>> data = new ArrayList<>();

            // 각 요소에서 정보 추출
            for (Element item : items) {
                // 제목, 가격, 링크 추출
                Element titleElement = item.selectFirst("h2");
                String title = (titleElement != null) ? titleElement.text().trim() : "";

                Element priceElement = item.selectFirst("span.price");
                String price = (priceElement != null) ? priceElement.text().trim() : "";

                Element linkElement = item.selectFirst("a");
                String link = (linkElement != null) ? linkElement.attr("href") : "";

                // Map에 저장
                Map<String, String> itemData = new HashMap<>();
                itemData.put("title", title);
                itemData.put("price", price);
                itemData.put("link", link);

                data.add(itemData);
            }

            // 결과 출력
            System.out.println("추출 완료: " + data.size() + "개");

        } catch (Exception e) {
            System.err.println("오류: " + e.getMessage());
        }
    }
}
```

### 4. 데이터 저장

추출한 데이터를 JSON 또는 CSV 파일로 저장한다.

**이해하기**: 수집한 데이터를 파일로 저장하면 나중에 다시 사용하거나 분석할 수 있다.

**JSON**: 프로그래밍에서 많이 사용하는 데이터 형식
**CSV**: 엑셀에서 열 수 있는 쉼표로 구분된 형식

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import java.io.File;
import java.io.FileWriter;
import java.util.List;
import java.util.Map;

public class DataSavingExample {
    public static void main(String[] args) {
        List<Map<String, String>> data = createSampleData();

        // JSON으로 저장
        saveAsJson(data);

        // CSV로 저장
        saveAsCsv(data);
    }

    // JSON 저장
    public static void saveAsJson(List<Map<String, String>> data) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(new File("data.json"), data);
            System.out.println("JSON 저장 완료");
        } catch (Exception e) {
            System.err.println("오류: " + e.getMessage());
        }
    }

    // CSV 저장
    public static void saveAsCsv(List<Map<String, String>> data) {
        try (FileWriter writer = new FileWriter("data.csv")) {
            writer.append("title,price,link\n");
            for (Map<String, String> item : data) {
                writer.append(item.get("title")).append(",")
                      .append(item.get("price")).append(",")
                      .append(item.get("link")).append("\n");
            }
            System.out.println("CSV 저장 완료");
        } catch (Exception e) {
            System.err.println("오류: " + e.getMessage());
        }
    }

    private static List<Map<String, String>> createSampleData() {
        List<Map<String, String>> data = new java.util.ArrayList<>();
        Map<String, String> item = new java.util.HashMap<>();
        item.put("title", "노트북");
        item.put("price", "1,000,000원");
        item.put("link", "https://example.com/laptop");
        data.add(item);
        return data;
    }
}
```

## 고급 크롤링 기법

기본적인 크롤링을 넘어서 더 복잡한 상황을 다루는 방법들이다.

### 동적 콘텐츠 처리

일부 웹사이트는 페이지를 열었을 때 바로 모든 내용이 나타나지 않는다. 스크롤을 내리거나 버튼을 클릭해야 더 많은 내용이 보인다. 이런 경우 Selenium을 사용해야 한다.

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

로그인이 필요한 사이트를 크롤링할 때는 쿠키와 세션을 관리해야 한다.

**쿠키란?**: 웹사이트가 사용자를 기억하기 위해 저장하는 작은 정보 파일이다. 로그인 상태를 유지하는 데 사용된다.

**세션이란?**: 서버가 사용자의 상태를 기억하는 것이다. 로그인 후 쿠키를 통해 세션이 유지된다.

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

서버 부담을 줄이기 위해 요청 사이에 간격을 둔다.

**왜 필요한가?**:

- 너무 빠르게 요청하면 서버에 부담이 간다
- 서버가 크롤러를 차단할 수 있다
- 윤리적인 크롤링을 위해 필요하다

**권장 사항**: 요청 사이에 1-3초 정도 대기하는 것이 좋다.

```java
import java.util.List;
import java.util.Random;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class CrawlWithDelayExample {
    public void crawlWithDelay(List<String> urls) throws InterruptedException {
        Random random = new Random();
        HttpClient client = HttpClient.newHttpClient();

        for (int i = 0; i < urls.size(); i++) {
            String url = urls.get(i);
            System.out.println("크롤링: " + url);

            try {
                HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .build();

                HttpResponse<String> response = client.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
                );

                if (response.statusCode() == 200) {
                    System.out.println("성공: " + response.body().length() + " 문자");
                }

            } catch (Exception e) {
                System.err.println("오류: " + e.getMessage());
            }

            // 마지막 URL이 아니면 1-3초 대기
            if (i < urls.size() - 1) {
                int delay = 1000 + random.nextInt(2000);
                Thread.sleep(delay);
            }
        }
    }
}
```

### 에러 처리 및 재시도

일시적인 오류에 대비해 재시도 로직을 구현한다.

**왜 필요한가?**:

- 네트워크가 일시적으로 불안정할 수 있다
- 서버가 일시적으로 바쁠 수 있다
- 이런 경우 다시 시도하면 성공할 수 있다

**재시도 전략**: 실패하면 잠시 기다렸다가 다시 시도한다. 시도 횟수가 늘어날수록 대기 시간도 늘린다(지수 백오프).

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.util.List;

public class RetryableHttpClient {
    public HttpResponse<String> sendRequestWithRetry(String url, int maxRetries) {
        // 재시도가 필요한 상태 코드
        List<Integer> retryStatusCodes = List.of(429, 500, 502, 503, 504);
        int attempt = 0;

        while (attempt < maxRetries) {
            try {
                HttpClient client = HttpClient.newHttpClient();
                HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(java.time.Duration.ofSeconds(10))
                    .build();

                HttpResponse<String> response = client.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
                );

                // 성공한 경우 응답 반환
                if (!retryStatusCodes.contains(response.statusCode())) {
                    return response;
                }

            } catch (Exception e) {
                System.err.println("오류: " + e.getMessage());
            }

            // 재시도 전 대기 (지수 백오프: 1초, 2초, 4초...)
            attempt++;
            if (attempt < maxRetries) {
                int waitTime = (int) Math.pow(2, attempt - 1) * 1000;
                try {
                    Thread.sleep(waitTime);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }

        throw new RuntimeException("최대 재시도 횟수 초과");
    }
}
```

## robots.txt 준수

크롤링하기 전에 반드시 확인해야 하는 것이 robots.txt 파일이다.

**robots.txt란?**: 웹사이트 관리자가 크롤러에게 "이 경로는 크롤링하지 마세요"라고 알려주는 파일이다. 웹사이트 루트에 `/robots.txt`로 접근할 수 있다.

**왜 중요한가?**:

- 웹사이트의 규칙을 존중하는 것
- 법적 문제를 피하는 것
- 서버에 불필요한 부담을 주지 않는 것

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

크롤링은 강력한 도구이지만, 반드시 지켜야 할 규칙들이 있다. 이를 무시하면 법적 문제가 발생할 수 있다.

### 1. **robots.txt 준수**

- 웹사이트의 robots.txt 파일 확인
- 금지된 경로는 크롤링하지 않기
- **초보자 팁**: 크롤링 전에 항상 `https://example.com/robots.txt`를 확인하자

### 2. **이용약관 확인**

- 웹사이트의 이용약관 검토
- 크롤링이 금지되어 있는지 확인
- **초보자 팁**: 사이트 하단의 "이용약관" 링크를 확인하자

### 3. **저작권 존중**

- 수집한 데이터의 저작권 확인
- 상업적 이용 시 라이선스 확인
- **초보자 팁**: 다른 사람의 글을 그대로 복사해서 사용하면 안 된다

### 4. **서버 부하 고려**

- 적절한 요청 간격 유지 (1-3초 권장)
- 동시 요청 수 제한
- 캐싱 활용 (같은 페이지를 여러 번 요청하지 않기)
- **초보자 팁**: 서버를 친구처럼 생각하고 예의를 지키자

### 5. **개인정보 보호**

- 개인정보 수집 시 법적 요구사항 준수
- GDPR, 개인정보보호법 등 고려
- **초보자 팁**: 개인정보가 포함된 데이터는 특히 주의하자

## 크롤링 방지 기법과 우회

일부 웹사이트는 크롤러를 차단하려고 한다. 이런 경우를 이해하고 대응하는 방법을 알아보자.

### 크롤링 방지 기법

웹사이트가 사용하는 크롤러 차단 방법들:

1. **User-Agent 검증**: 브라우저가 아닌 프로그램을 감지
2. **IP 기반 차단**: 특정 IP에서 너무 많은 요청이 오면 차단
3. **CAPTCHA**: 사람인지 확인하는 퍼즐
4. **JavaScript 렌더링 필요**: JavaScript 없이는 데이터가 안 보임
5. **Rate Limiting**: 초당 요청 수를 제한

**초보자 팁**: 이런 차단을 우회하려고 하기보다는, 차단되지 않도록 예의를 지키는 것이 좋다.

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

뉴스 사이트에서 여러 페이지의 기사를 수집하는 완전한 예제다. 이 예제를 따라하면 실제로 동작하는 크롤러를 만들 수 있다.

**이 예제에서 배우는 것**:

1. 여러 페이지를 순차적으로 크롤링하는 방법
2. 각 페이지에서 기사 정보를 추출하는 방법
3. 수집한 데이터를 JSON 파일로 저장하는 방법

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
    // 한 페이지의 기사 목록 크롤링
    public List<Map<String, String>> crawlNews(String url) throws Exception {
        Document doc = Jsoup.connect(url)
            .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            .timeout(10000)
            .get();

        List<Map<String, String>> articles = new ArrayList<>();
        Elements newsItems = doc.select("div.news-item");

        for (Element item : newsItems) {
            try {
                // 제목, 링크, 날짜 추출
                Element titleElement = item.selectFirst("h2");
                String title = (titleElement != null) ? titleElement.text().trim() : "제목 없음";

                Element linkElement = item.selectFirst("a");
                String link = (linkElement != null) ? linkElement.attr("href") : "";
                if (link.startsWith("/")) {
                    link = "https://example.com" + link;
                }

                Element dateElement = item.selectFirst("span.date");
                String date = (dateElement != null) ? dateElement.text().trim() : "날짜 없음";

                // Map에 저장
                Map<String, String> article = new HashMap<>();
                article.put("title", title);
                article.put("link", link);
                article.put("date", date);
                articles.add(article);

            } catch (Exception e) {
                System.err.println("기사 처리 오류: " + e.getMessage());
            }
        }

        return articles;
    }

    public static void main(String[] args) {
        try {
            NewsCrawler crawler = new NewsCrawler();
            List<Map<String, String>> allArticles = new ArrayList<>();

            // 여러 페이지 크롤링
            for (int page = 1; page <= 5; page++) {
                String url = "https://example.com/news?page=" + page;
                allArticles.addAll(crawler.crawlNews(url));

                if (page < 5) {
                    Thread.sleep(1000); // 서버 부하 방지
                }
            }

            // JSON으로 저장
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            mapper.writeValue(new File("news.json"), allArticles);

            System.out.println("저장 완료: " + allArticles.size() + "개 기사");

        } catch (Exception e) {
            System.err.println("오류: " + e.getMessage());
        }
    }
}
```

### 실행 방법

1. **의존성 추가** (Maven의 경우 `pom.xml`에 추가):

```xml
<dependencies>
    <!-- Jsoup: HTML 파싱 -->
    <dependency>
        <groupId>org.jsoup</groupId>
        <artifactId>jsoup</artifactId>
        <version>1.17.1</version>
    </dependency>

    <!-- Jackson: JSON 처리 -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.15.2</version>
    </dependency>
</dependencies>
```

2. **컴파일 및 실행**:

```bash
javac -cp "jsoup-1.17.1.jar:jackson-databind-2.15.2.jar" NewsCrawler.java
java -cp ".:jsoup-1.17.1.jar:jackson-databind-2.15.2.jar" NewsCrawler
```

3. **결과 확인**: `news.json` 파일이 생성되고 수집한 기사 정보가 저장됩니다.

## 성능 최적화

여러 페이지를 하나씩 순차적으로 크롤링하면 시간이 오래 걸린다. 동시에 여러 페이지를 크롤링하면 속도가 크게 향상된다.

**초보자 팁**: 처음에는 순차적으로 크롤링하는 것이 안전하다. 서버에 부담을 주지 않고, 차단될 위험도 적다. 속도가 중요해지면 비동기나 멀티스레딩을 사용하자.

### 비동기 크롤링

여러 요청을 동시에 보내고 응답을 기다린다.

**이해하기**:

- **동기 방식**: 요청1 → 응답1 대기 → 요청2 → 응답2 대기 (느림)
- **비동기 방식**: 요청1, 요청2, 요청3 동시에 보냄 → 모든 응답 대기 (빠름)

**주의**: 너무 많은 요청을 동시에 보내면 서버에 부담이 가고 차단될 수 있다.

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.ArrayList;

public class AsyncCrawler {
    public List<String> crawlAsync(List<String> urls) {
        HttpClient client = HttpClient.newHttpClient();
        List<CompletableFuture<String>> futures = new ArrayList<>();

        // 각 URL에 대해 비동기 요청 생성
        for (String url : urls) {
            CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
                try {
                    HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(url))
                        .build();

                    return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                        .thenApply(response -> response.body())
                        .join();

                } catch (Exception e) {
                    return "";
                }
            });
            futures.add(future);
        }

        // 모든 응답 대기
        List<String> results = new ArrayList<>();
        for (CompletableFuture<String> future : futures) {
            results.add(future.join());
        }

        return results;
    }
}
```

### 멀티스레딩

여러 스레드를 사용하여 동시에 여러 작업을 처리한다.

**이해하기**:

- **스레드**: 작업을 수행하는 작은 단위
- **멀티스레딩**: 여러 스레드가 동시에 일을 하는 것
- 예: 5명이 동시에 각각 다른 페이지를 크롤링하는 것과 같다

**주의**: 스레드 수가 너무 많으면 컴퓨터 리소스를 많이 사용한다.

```java
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.ArrayList;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class MultiThreadCrawler {
    public List<String> crawlPages(List<String> urls) throws Exception {
        // 스레드 풀 생성 (최대 5개 스레드)
        ExecutorService executor = Executors.newFixedThreadPool(5);
        List<Future<String>> futures = new ArrayList<>();

        // 각 URL을 스레드 풀에 제출
        for (String url : urls) {
            Future<String> future = executor.submit(() -> {
                try {
                    HttpClient client = HttpClient.newHttpClient();
                    HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(url))
                        .build();
                    HttpResponse<String> response = client.send(
                        request,
                        HttpResponse.BodyHandlers.ofString()
                    );
                    return response.body();
                } catch (Exception e) {
                    return "";
                }
            });
            futures.add(future);
        }

        // 모든 작업 완료 대기
        List<String> results = new ArrayList<>();
        for (Future<String> future : futures) {
            results.add(future.get());
        }

        executor.shutdown();
        return results;
    }
}
```

### 동기 vs 비동기 vs 멀티스레딩 비교

| 방식           | 설명                    | 장점                        | 단점                          |
| -------------- | ----------------------- | --------------------------- | ----------------------------- |
| **동기**       | 하나씩 순차적으로 처리  | 구현이 간단, 서버 부담 적음 | 느림                          |
| **비동기**     | 여러 요청을 동시에 보냄 | 빠름, 단일 스레드 사용      | 복잡도 증가                   |
| **멀티스레딩** | 여러 스레드로 동시 처리 | 빠름, 제어 가능             | 리소스 사용 많음, 동기화 필요 |

## 데이터 정제 및 처리

추출한 데이터를 정제하여 사용하기 쉽게 만든다.

**왜 필요한가?**: 웹에서 가져온 데이터에는 불필요한 HTML 태그, 공백, 특수문자 등이 섞여 있을 수 있다. 이런 것들을 제거하고 깔끔하게 만드는 것이 데이터 정제다.

**정제하는 것들**:

- HTML 태그 제거
- 불필요한 공백 제거
- 특수문자 제거
- 날짜 형식 통일

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DataCleaner {
    // HTML 태그 제거 및 텍스트 정리
    public String cleanText(String text) {
        text = text.replaceAll("<[^>]+>", "");  // HTML 태그 제거
        text = text.replaceAll("\\s+", " ").trim();  // 공백 정리
        text = text.replaceAll("[^\\w\\s]", "");  // 특수 문자 제거
        return text.trim();
    }

    // 날짜 문자열 파싱
    public LocalDate parseDate(String dateString) {
        String[] formats = {"yyyy-MM-dd", "dd/MM/yyyy", "MMMM d, yyyy"};
        for (String format : formats) {
            try {
                return LocalDate.parse(dateString, DateTimeFormatter.ofPattern(format));
            } catch (Exception e) {
                // 다음 형식 시도
            }
        }
        return null;
    }
}
```

## 모범 사례

크롤링을 안전하고 효율적으로 하기 위한 좋은 습관들이다.

1. **요청 간격 유지**

   - 서버 부하를 줄이기 위해 적절한 딜레이 추가
   - `Thread.sleep()` 사용
   - **초보자 팁**: 최소 1초는 대기하자

2. **에러 처리**

   - 네트워크 오류, 타임아웃 등 예외 상황 처리
   - 재시도 로직 구현
   - try-catch 블록으로 예외 처리
   - **초보자 팁**: 항상 try-catch로 감싸서 프로그램이 중단되지 않게 하자

3. **캐싱 활용**

   - 동일한 페이지를 여러 번 요청하지 않도록 캐싱
   - `Caffeine` 또는 `EhCache` 같은 캐싱 라이브러리 활용
   - **초보자 팁**: 같은 URL을 여러 번 크롤링하지 않도록 주의하자

4. **로깅**

   - 크롤링 과정을 로그로 기록
   - SLF4J + Logback 같은 로깅 프레임워크 사용
   - 디버깅과 모니터링에 유용
   - **초보자 팁**: `System.out.println()`으로라도 진행 상황을 출력하자

5. **데이터 검증**

   - 수집한 데이터의 유효성 검사
   - 예상과 다른 구조에 대비
   - null 체크 및 예외 처리
   - **초보자 팁**: 데이터를 추출할 때 null인지 확인하자

## 주의사항

크롤링을 시작하기 전에 반드시 알아야 할 것들이다.

1. **법적 리스크**

   - 크롤링이 불법이 될 수 있는 경우가 있음
   - 이용약관과 저작권법 확인 필수
   - **초보자 팁**: 확실하지 않으면 크롤링하지 않는 것이 안전하다

2. **기술적 제한**

   - JavaScript로 렌더링되는 콘텐츠는 Selenium/WebDriver 필요
   - CAPTCHA나 복잡한 인증은 우회 어려움
   - HtmlUnit 같은 헤드리스 브라우저 사용 고려
   - **초보자 팁**: 처음에는 간단한 정적 페이지부터 시작하자

3. **데이터 품질**

   - 웹사이트 구조 변경 시 크롤러 수정 필요
   - 불완전하거나 오래된 데이터 가능성
   - **초보자 팁**: 웹사이트가 업데이트되면 크롤러도 수정해야 한다

4. **서버 부하**

   - 과도한 요청은 서버에 부담
   - IP 차단 위험
   - **초보자 팁**: 적절한 간격을 두고 요청하자. 서버를 배려하는 것이 중요하다

## 결론

웹 크롤링은 유용한 데이터 수집 방법이지만, 법적·윤리적 고려사항을 반드시 준수해야 한다.

**초보자를 위한 요약**:

1. ✅ robots.txt를 확인하자
2. ✅ 요청 사이에 적절한 간격(1-3초)을 두자
3. ✅ 이용약관을 확인하자
4. ✅ 서버에 부담을 주지 않도록 하자
5. ✅ 처음에는 간단한 페이지부터 시작하자

올바른 도구와 기법을 사용하면 효율적으로 데이터를 수집할 수 있지만, 항상 책임감 있게 크롤링해야 한다. 크롤링은 강력한 도구이지만, 그만큼 책임도 크다. 웹사이트를 존중하고, 규칙을 지키며, 윤리적으로 사용하자.
