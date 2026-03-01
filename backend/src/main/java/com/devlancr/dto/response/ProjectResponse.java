package com.devlancr.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
public class ProjectResponse {
    private Long id;
    private String title;
    private String description;
    private String projectType;
    private BigDecimal budgetMin;
    private BigDecimal budgetMax;
    private String status;
    private String experienceLevel;
    private LocalDateTime deadline;
    private Integer totalProposals;
    private Set<String> skills;
    private String clientName;
    private Long clientUserId;
    private LocalDateTime createdAt;
}
