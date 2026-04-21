package com.juseop.portfolio.config;

import com.juseop.portfolio.entity.Post;
import com.juseop.portfolio.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 애플리케이션 시작 시 classpath의 마크다운 파일을 읽어 posts 테이블에 동기화합니다.
 * 이미 존재하는 slug는 건너뜁니다 (중복 방지).
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class PostInitializer implements CommandLineRunner {

    private final PostMapper postMapper;

    private static final Pattern FRONTMATTER_TITLE = Pattern.compile("title:\\s*\"(.+?)\"");
    private static final Pattern FRONTMATTER_DATE  = Pattern.compile("date:\\s*\"(.+?)\"");
    private static final Pattern FRONTMATTER_DESC  = Pattern.compile("description:\\s*\"(.+?)\"");
    private static final Pattern FRONTMATTER_BLOCK = Pattern.compile("^---\\s*\\n(.+?)\\n---\\s*\\n", Pattern.DOTALL);

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        syncPosts("blog");
        syncPosts("troubleShooting");
    }

    private void syncPosts(String type) throws IOException {
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = resolver.getResources("classpath:posts/" + type + "/*.md");

        for (Resource resource : resources) {
            String filename = resource.getFilename();
            if (filename == null) continue;

            String slug = filename.replace(".md", "");
            if (postMapper.existsBySlug(slug)) {
                log.debug("[PostInitializer] 이미 존재하는 포스트 건너뜀: {}", slug);
                continue;
            }

            String rawContent = resource.getContentAsString(StandardCharsets.UTF_8);
            Post post = parsePost(rawContent, slug, type);
            if (post != null) {
                postMapper.insert(post);
                log.info("[PostInitializer] 포스트 삽입 완료: {} ({})", slug, type);
            }
        }
    }

    private Post parsePost(String raw, String slug, String type) {
        Matcher frontmatterMatcher = FRONTMATTER_BLOCK.matcher(raw);
        if (!frontmatterMatcher.find()) {
            log.warn("[PostInitializer] frontmatter 파싱 실패: {}", slug);
            return null;
        }

        String frontmatter = frontmatterMatcher.group(1);
        String content = raw.substring(frontmatterMatcher.end()).trim();

        String title = extract(FRONTMATTER_TITLE, frontmatter, slug);
        String dateStr = extract(FRONTMATTER_DATE, frontmatter, "2025-01-01");
        String description = extract(FRONTMATTER_DESC, frontmatter, "");

        Post post = new Post();
        post.setSlug(slug);
        post.setType(type);
        post.setTitle(title);
        post.setDescription(description);
        post.setContent(content);
        post.setPublishedAt(LocalDate.parse(dateStr));
        return post;
    }

    private String extract(Pattern pattern, String text, String defaultValue) {
        Matcher m = pattern.matcher(text);
        return m.find() ? m.group(1) : defaultValue;
    }
}
