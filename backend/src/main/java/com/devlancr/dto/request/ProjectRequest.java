package com.devlancr.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class ProjectRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String projectType; // FIXED, HOURLY

    private BigDecimal budgetMin;
    private BigDecimal budgetMax;

    private String experienceLevel; // ENTRY, INTERMEDIATE, EXPERT

    private LocalDateTime deadline;

    private Set<Long> skillIds;
}
