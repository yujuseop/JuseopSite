package com.juseop.portfolio.mapper;

import com.juseop.portfolio.dto.PostSummaryDto;
import com.juseop.portfolio.entity.Comment;
import com.juseop.portfolio.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Optional;

@Mapper
public interface PostMapper {
    // 포스트
    List<PostSummaryDto> findSummaries(@Param("type") String type,
                                       @Param("offset") int offset,
                                       @Param("size") int size);
    long countByType(@Param("type") String type);
    Optional<Post> findBySlug(@Param("slug") String slug);
    boolean existsBySlug(@Param("slug") String slug);
    void insert(Post post);

    // 조회수
    void insertView(@Param("postId") Integer postId,
                    @Param("ipHash") String ipHash);
    long countViews(@Param("postId") Integer postId);
    boolean existsView(@Param("postId") Integer postId,
                       @Param("ipHash") String ipHash);

    // 좋아요
    void insertLike(@Param("postId") Integer postId,
                    @Param("sessionId") String sessionId);
    void deleteLike(@Param("postId") Integer postId,
                    @Param("sessionId") String sessionId);
    boolean existsLike(@Param("postId") Integer postId,
                       @Param("sessionId") String sessionId);
    long countLikes(@Param("postId") Integer postId);

    // 댓글
    List<Comment> findCommentsByPostId(@Param("postId") Integer postId);
    void insertComment(Comment comment);
    long countComments(@Param("postId") Integer postId);
}
