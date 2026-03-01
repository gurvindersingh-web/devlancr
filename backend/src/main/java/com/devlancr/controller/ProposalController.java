package com.devlancr.controller;

import com.devlancr.dto.request.ProposalRequest;
import com.devlancr.dto.response.ApiResponse;
import com.devlancr.dto.response.ProposalResponse;
import com.devlancr.service.ProposalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proposals")
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalService proposalService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProposalResponse>> submitProposal(
            Authentication auth, @Valid @RequestBody ProposalRequest request) {
        ProposalResponse proposal = proposalService.submitProposal(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Proposal submitted", proposal));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<ApiResponse<List<ProposalResponse>>> getProjectProposals(@PathVariable Long projectId) {
        return ResponseEntity.ok(ApiResponse.success(proposalService.getProjectProposals(projectId)));
    }

    @GetMapping("/my-proposals")
    public ResponseEntity<ApiResponse<List<ProposalResponse>>> getMyProposals(Authentication auth) {
        return ResponseEntity.ok(ApiResponse.success(proposalService.getFreelancerProposals(auth.getName())));
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<ApiResponse<ProposalResponse>> acceptProposal(
            @PathVariable Long id, Authentication auth) {
        return ResponseEntity
                .ok(ApiResponse.success("Proposal accepted", proposalService.acceptProposal(id, auth.getName())));
    }
}
