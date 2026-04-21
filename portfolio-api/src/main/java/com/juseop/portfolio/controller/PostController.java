package com.juseop.portfolio.controller;

import com.juseop.portfolio.dto.CommentCreateDto;
import com.juseop.portfolio.dto.PageResponse;
import com.juseop.portfolio.dto.PostSummaryDto;
import com.juseop.portfolio.entity.Comment;
import com.juseop.portfolio.entity.Post;
import com.juseop.portfolio.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    /** 포스트 목록 (타입별 페이징) */
    @GetMapping
    public ResponseEntity<PageResponse<PostSummaryDto>> getPosts(
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.getPosts(type, page, size));
    }

    /** 포스트 상세 */
    @GetMapping("/{slug}")
    public ResponseEntity<Post> getPost(@PathVariable String slug) {
        return ResponseEntity.ok(postService.getPostBySlug(slug));
    }

    /** 조회수 증가 */
    @PostMapping("/{slug}/views")
    public ResponseEntity<Map<String, Object>> recordView(
            @PathVariable String slug,
            HttpServletRequest request) {
        String ip = getClientIp(request);
        return ResponseEntity.ok(postService.recordView(slug, ip));
    }

    /** 좋아요 토글 */
    @PostMapping("/{slug}/likes")
    public ResponseEntity<Map<String, Object>> toggleLike(
            @PathVariable String slug,
            @RequestBody Map<String, String> body) {
        String sessionId = body.getOrDefault("sessionId", "anonymous");
        return ResponseEntity.ok(postService.toggleLike(slug, sessionId));
    }

    /** 댓글 목록 */
    @GetMapping("/{slug}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable String slug) {
        return ResponseEntity.ok(postService.getComments(slug));
    }

    /** 댓글 작성 */
    @PostMapping("/{slug}/comments")
    public ResponseEntity<Comment> addComment(
            @PathVariable String slug,
            @Valid @RequestBody CommentCreateDto dto) {
        return ResponseEntity.ok(postService.addComment(slug, dto));
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
