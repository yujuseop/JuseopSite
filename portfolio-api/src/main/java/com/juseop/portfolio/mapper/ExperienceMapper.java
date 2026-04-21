package com.juseop.portfolio.mapper;

import com.juseop.portfolio.entity.Experience;
import com.juseop.portfolio.entity.ExperienceHighlight;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ExperienceMapper {
    List<Experience> findAll();
    List<String> findTechStackByExperienceId(Integer experienceId);
    List<ExperienceHighlight> findHighlightsByExperienceId(Integer experienceId);
    List<String> findDetailsByHighlightId(Integer highlightId);
}
