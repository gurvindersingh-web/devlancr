package com.devlancr.controller;

import com.devlancr.dto.response.*;
import com.devlancr.entity.Dispute;
import com.devlancr.entity.enums.*;
import com.devlancr.exception.ResourceNotFoundException;
import com.devlancr.repository.*;
import com.devlancr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ContractRepository contractRepository;
    private final FreelancerProfileRepository freelancerProfileRepository;
    private final ClientProfileRepository clientProfileRepository;
    private final DisputeRepository disputeRepository;
    private final TransactionRepository transactionRepository;

    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<AdminAnalyticsResponse>> getAnalytics() {
        AdminAnalyticsResponse analytics = AdminAnalyticsResponse.builder()
                .totalUsers(userRepository.count())
                .activeUsers(userRepository.countByIsActiveTrue())
                .totalProjects(projectRepository.count())
                .openProjects(projectRepository.countByStatus(ProjectStatus.OPEN))
                .activeContracts(contractRepository.countByStatus(ContractStatus.ACTIVE))
                .totalFreelancers(freelancerProfileRepository.count())
                .totalClients(clientProfileRepository.count())
                .openDisputes(disputeRepository.findByStatus(DisputeStatus.OPEN).size())
                .totalPlatformRevenue(transactionRepository.getTotalPlatformFees())
                .build();
        return ResponseEntity.ok(ApiResponse.success(analytics));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.success(userService.getAllUsers()));
    }

    @PostMapping("/users/{id}/toggle-status")
    public ResponseEntity<ApiResponse<Void>> toggleUserStatus(@PathVariable Long id) {
        userService.toggleUserStatus(id);
        return ResponseEntity.ok(ApiResponse.success("User status toggled", null));
    }

    @GetMapping("/disputes")
    public ResponseEntity<ApiResponse<List<Dispute>>> getOpenDisputes() {
        return ResponseEntity.ok(ApiResponse.success(disputeRepository.findByStatus(DisputeStatus.OPEN)));
    }

    @PostMapping("/disputes/{id}/resolve")
    public ResponseEntity<ApiResponse<Dispute>> resolveDispute(
            @PathVariable Long id, @RequestParam String resolution) {
        Dispute dispute = disputeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dispute not found"));
        dispute.setStatus(DisputeStatus.RESOLVED);
        dispute.setResolution(resolution);
        return ResponseEntity.ok(ApiResponse.success("Dispute resolved", disputeRepository.save(dispute)));
    }
}
