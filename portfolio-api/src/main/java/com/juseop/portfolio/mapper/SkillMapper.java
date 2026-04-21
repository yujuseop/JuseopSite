package com.juseop.portfolio.mapper;

import com.juseop.portfolio.entity.SkillCategory;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface SkillMapper {
    List<SkillCategory> findAllCategories();
    List<String> findSkillsByCategoryId(String categoryId);
}
