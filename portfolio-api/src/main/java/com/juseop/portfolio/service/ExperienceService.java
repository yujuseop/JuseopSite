package com.juseop.portfolio.service;

import com.juseop.portfolio.entity.Experience;
import com.juseop.portfolio.entity.ExperienceHighlight;
import com.juseop.portfolio.mapper.ExperienceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceMapper experienceMapper;

    public List<Experience> getAllExperiences() {
        List<Experience> experiences = experienceMapper.findAll();
        experiences.forEach(this::enrichExperience);
        return experiences;
    }

    private void enrichExperience(Experience experience) {
        experience.setTechStack(
            experienceMapper.findTechStackByExperienceId(experience.getId())
        );
        List<ExperienceHighlight> highlights =
            experienceMapper.findHighlightsByExperienceId(experience.getId());
        highlights.forEach(h ->
            h.setDetails(experienceMapper.findDetailsByHighlightId(h.getId()))
        );
        experience.setHighlights(highlights);
    }
}
