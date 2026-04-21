package com.juseop.portfolio.controller;

import com.juseop.portfolio.entity.SkillCategory;
import com.juseop.portfolio.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<List<SkillCategory>> getSkills() {
        return ResponseEntity.ok(skillService.getAllCategories());
    }
}
