package com.juseop.portfolio.mapper;

import com.juseop.portfolio.entity.Project;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import java.util.Optional;

@Mapper
public interface ProjectMapper {
    List<Project> findAll();
    Optional<Project> findBySlug(String slug);
    List<String> findTechStackByProjectId(Integer projectId);
    List<String> findHighlightsByProjectId(Integer projectId);
}
