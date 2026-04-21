package com.juseop.portfolio.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class Experience {
    private Integer id;
    private String company;
    private String emoji;
    private String role;
    private String employmentType;
    private String period;
    private String summary;
    private String team;
    private Integer displayOrder;
    private List<String> techStack;
    private List<ExperienceHighlight> highlights;
}
