package com.juseop.portfolio.controller;

import com.juseop.portfolio.dto.CommentCreateDto;
import com.juseop.portfolio.entity.Comment;
import com.juseop.portfolio.mapper.CommentMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentMapper commentMapper;

    @GetMapping("/{slug}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable String slug) {
        return ResponseEntity.ok(commentMapper.findBySlug(slug));
    }

    @PostMapping("/{slug}")
    public ResponseEntity<Comment> addComment(
            @PathVariable String slug,
            @Valid @RequestBody CommentCreateDto dto) {
        commentMapper.insert(slug, dto);
        List<Comment> comments = commentMapper.findBySlug(slug);
        return ResponseEntity.ok(comments.get(comments.size() - 1));
    }
}
