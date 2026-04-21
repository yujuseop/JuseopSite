package com.juseop.portfolio.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class Project {
    private Integer id;
    private String slug;
    private String emoji;
    private String title;
    private String summary;
    private String description;
    private String participants;
    private String duration;
    private String demoUrl;
    private String repoUrl;
    private Integer displayOrder;
    private List<String> techStack;
    private List<String> highlights;
}
