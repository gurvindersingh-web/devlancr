package com.devlancr.controller;

import com.devlancr.dto.request.ProjectRequest;
import com.devlancr.dto.response.ApiResponse;
import com.devlancr.dto.response.ProjectResponse;
import com.devlancr.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectResponse>> createProject(
            Authentication auth, @Valid @RequestBody ProjectRequest request) {
        ProjectResponse project = projectService.createProject(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Project created", project));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponse>> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(projectService.getProject(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProjectResponse>>> searchProjects(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) BigDecimal minBudget,
            @RequestParam(required = false) BigDecimal maxBudget,
            @RequestParam(required = false) String level,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ProjectResponse> projects = projectService.searchProjects(keyword, status, minBudget, maxBudget, level,
                page, size);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/my-projects")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getMyProjects(Authentication auth) {
        return ResponseEntity.ok(ApiResponse.success(projectService.getClientProjects(auth.getName())));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponse>> updateProject(
            @PathVariable Long id, Authentication auth, @Valid @RequestBody ProjectRequest request) {
        return ResponseEntity
                .ok(ApiResponse.success("Project updated", projectService.updateProject(id, auth.getName(), request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id, Authentication auth) {
        projectService.deleteProject(id, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Project deleted", null));
    }
}
