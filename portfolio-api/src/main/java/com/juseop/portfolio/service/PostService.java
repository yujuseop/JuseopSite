package com.juseop.portfolio.service;

import com.juseop.portfolio.dto.CommentCreateDto;
import com.juseop.portfolio.dto.PageResponse;
import com.juseop.portfolio.dto.PostSummaryDto;
import com.juseop.portfolio.entity.Comment;
import com.juseop.portfolio.entity.Post;
import com.juseop.portfolio.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;

    public PageResponse<PostSummaryDto> getPosts(String type, int page, int size) {
        int offset = page * size;
        List<PostSummaryDto> content = postMapper.findSummaries(type, offset, size);
        long total = postMapper.countByType(type);
        return new PageResponse<>(content, page, size, total);
    }

    public Post getPostBySlug(String slug) {
        return postMapper.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("포스트를 찾을 수 없습니다: " + slug));
    }

    @Transactional
    public Map<String, Object> recordView(String slug, String clientIp) {
        Post post = getPostBySlug(slug);
        String ipHash = hashIp(clientIp);
        if (!postMapper.existsView(post.getId(), ipHash)) {
            postMapper.insertView(post.getId(), ipHash);
        }
        return Map.of("viewCount", postMapper.countViews(post.getId()));
    }

    @Transactional
    public Map<String, Object> toggleLike(String slug, String sessionId) {
        Post post = getPostBySlug(slug);
        boolean liked;
        if (postMapper.existsLike(post.getId(), sessionId)) {
            postMapper.deleteLike(post.getId(), sessionId);
            liked = false;
        } else {
            postMapper.insertLike(post.getId(), sessionId);
            liked = true;
        }
        return Map.of(
            "liked", liked,
            "likeCount", postMapper.countLikes(post.getId())
        );
    }

    public List<Comment> getComments(String slug) {
        Post post = getPostBySlug(slug);
        return postMapper.findCommentsByPostId(post.getId());
    }

    @Transactional
    public Comment addComment(String slug, CommentCreateDto dto) {
        Post post = getPostBySlug(slug);
        Comment comment = new Comment();
        comment.setPostId(post.getId());
        comment.setAuthorName(dto.getAuthorName());
        comment.setContent(dto.getContent());
        postMapper.insertComment(comment);
        return comment;
    }

    private String hashIp(String ip) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(ip.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash).substring(0, 16);
        } catch (Exception e) {
            return ip.substring(0, Math.min(16, ip.length()));
        }
    }
}
