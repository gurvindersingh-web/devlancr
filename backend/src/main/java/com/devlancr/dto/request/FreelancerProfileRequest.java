package com.devlancr.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Set;

@Data
public class FreelancerProfileRequest {
    private String title;
    private String bio;

    @DecimalMin("0.0")
    private BigDecimal hourlyRate;

    private String experienceLevel;
    private String portfolioUrl;
    private Set<Long> skillIds;
}
