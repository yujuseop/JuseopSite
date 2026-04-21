package com.juseop.portfolio.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter @Setter
public class PostSummaryDto {
    private Integer id;
    private String slug;
    private String type;
    private String title;
    private String description;
    private LocalDate publishedAt;
    private Long viewCount;
    private Long likeCount;
    private Long commentCount;
}
