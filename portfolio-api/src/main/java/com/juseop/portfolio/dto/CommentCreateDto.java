package com.juseop.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommentCreateDto {
    @NotBlank(message = "작성자명을 입력해주세요.")
    @Size(max = 100, message = "작성자명은 100자 이하로 입력해주세요.")
    private String authorName;

    @NotBlank(message = "내용을 입력해주세요.")
    @Size(max = 1000, message = "댓글은 1000자 이하로 입력해주세요.")
    private String content;
}
