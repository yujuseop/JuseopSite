package com.juseop.portfolio.mapper;

import com.juseop.portfolio.dto.CommentCreateDto;
import com.juseop.portfolio.entity.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface CommentMapper {
    List<Comment> findBySlug(@Param("slug") String slug);
    void insert(@Param("slug") String slug, @Param("dto") CommentCreateDto dto);
}
