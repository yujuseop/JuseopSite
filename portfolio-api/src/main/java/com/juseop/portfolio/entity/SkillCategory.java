package com.juseop.portfolio.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class SkillCategory {
    private String id;
    private String title;
    private String description;
    private Integer displayOrder;
    private List<Skill> skills;

    @Getter @Setter
    public static class Skill {
        private String name;
        private Integer level;
        private String description;
    }
}
