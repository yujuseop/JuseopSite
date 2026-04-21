package com.juseop.portfolio.controller;

import com.juseop.portfolio.entity.Experience;
import com.juseop.portfolio.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceService experienceService;

    @GetMapping
    public ResponseEntity<List<Experience>> getExperiences() {
        return ResponseEntity.ok(experienceService.getAllExperiences());
    }
}
