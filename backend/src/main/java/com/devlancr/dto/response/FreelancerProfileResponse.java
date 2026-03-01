package com.devlancr.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
public class FreelancerProfileResponse {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private String title;
    private String bio;
    private BigDecimal hourlyRate;
    private String experienceLevel;
    private String portfolioUrl;
    private BigDecimal avgRating;
    private Integer totalReviews;
    private BigDecimal totalEarnings;
    private Boolean isAvailable;
    private Set<String> skills;
}
