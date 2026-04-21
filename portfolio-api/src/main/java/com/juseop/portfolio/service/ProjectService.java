package com.juseop.portfolio.service;

import com.juseop.portfolio.entity.Project;
import com.juseop.portfolio.mapper.ProjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectMapper projectMapper;

    public List<Project> getAllProjects() {
        List<Project> projects = projectMapper.findAll();
        projects.forEach(this::enrichProject);
        return projects;
    }

    public Project getProjectBySlug(String slug) {
        Project project = projectMapper.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다: " + slug));
        enrichProject(project);
        return project;
    }

    private void enrichProject(Project project) {
        project.setTechStack(projectMapper.findTechStackByProjectId(project.getId()));
        project.setHighlights(projectMapper.findHighlightsByProjectId(project.getId()));
    }
}
