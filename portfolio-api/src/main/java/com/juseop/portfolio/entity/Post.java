package com.juseop.portfolio.entity;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
public class Post {
    private Integer id;
    private String slug;
    private String type;
    private String title;
    private String description;
    private String content;
    private LocalDate publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    // 조회수, 좋아요 수 (집계용)
    private Long viewCount;
    private Long likeCount;
    private Long commentCount;
}
