package com.devlancr.controller;

import com.devlancr.dto.response.*;
import com.devlancr.entity.Skill;
import com.devlancr.repository.FreelancerProfileRepository;
import com.devlancr.repository.SkillRepository;
import com.devlancr.entity.enums.ExperienceLevel;
import com.devlancr.service.ProjectService;
import com.devlancr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final ProjectService projectService;
    private final FreelancerProfileRepository freelancerProfileRepository;
    private final SkillRepository skillRepository;

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<Page<ProjectResponse>>> searchProjects(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) BigDecimal minBudget,
            @RequestParam(required = false) BigDecimal maxBudget,
            @RequestParam(required = false) String level,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(
                projectService.searchProjects(keyword, status, minBudget, maxBudget, level, page, size)));
    }

    @GetMapping("/freelancers")
    public ResponseEntity<ApiResponse<Page<FreelancerProfileResponse>>> searchFreelancers(
            @RequestParam(required = false) BigDecimal minRate,
            @RequestParam(required = false) BigDecimal maxRate,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) BigDecimal minRating,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        ExperienceLevel el = level != null ? ExperienceLevel.valueOf(level.toUpperCase()) : null;
        var results = freelancerProfileRepository.searchFreelancers(minRate, maxRate, el, minRating,
                PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.success(
                results.map(UserService::mapToFreelancerResponse)));
    }

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<List<Skill>>> getAllSkills() {
        return ResponseEntity.ok(ApiResponse.success(skillRepository.findAll()));
    }
}
