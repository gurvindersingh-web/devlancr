package com.devlancr.controller;

import com.devlancr.dto.request.MilestoneRequest;
import com.devlancr.dto.response.ApiResponse;
import com.devlancr.entity.Milestone;
import com.devlancr.service.MilestoneService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;

    @PostMapping
    public ResponseEntity<ApiResponse<Milestone>> createMilestone(
            Authentication auth, @Valid @RequestBody MilestoneRequest request) {
        Milestone milestone = milestoneService.createMilestone(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Milestone created", milestone));
    }

    @GetMapping("/contract/{contractId}")
    public ResponseEntity<ApiResponse<List<Milestone>>> getContractMilestones(@PathVariable Long contractId) {
        return ResponseEntity.ok(ApiResponse.success(milestoneService.getContractMilestones(contractId)));
    }

    @PostMapping("/{id}/fund")
    public ResponseEntity<ApiResponse<Milestone>> fundMilestone(
            @PathVariable Long id, Authentication auth) {
        return ResponseEntity
                .ok(ApiResponse.success("Milestone funded", milestoneService.fundMilestone(id, auth.getName())));
    }

    @PostMapping("/{id}/release")
    public ResponseEntity<ApiResponse<Milestone>> releaseMilestone(
            @PathVariable Long id, Authentication auth) {
        return ResponseEntity
                .ok(ApiResponse.success("Payment released", milestoneService.releaseMilestone(id, auth.getName())));
    }
}
