package com.juseop.portfolio.service;

import com.juseop.portfolio.entity.SkillCategory;
import com.juseop.portfolio.mapper.SkillMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillMapper skillMapper;

    public List<SkillCategory> getAllCategories() {
        List<SkillCategory> categories = skillMapper.findAllCategories();
        categories.forEach(c ->
            c.setSkills(skillMapper.findSkillsByCategoryId(c.getId()))
        );
        return categories;
    }
}
