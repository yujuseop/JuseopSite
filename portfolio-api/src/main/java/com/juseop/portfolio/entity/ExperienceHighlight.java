package com.juseop.portfolio.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class ExperienceHighlight {
    private Integer id;
    private String title;
    private Integer displayOrder;
    private List<String> details;
}
