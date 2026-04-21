package com.juseop.portfolio.entity;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter @Setter
public class Comment {
    private Integer id;
    private String slug;
    private String authorName;
    private String content;
    private LocalDateTime createdAt;
}
