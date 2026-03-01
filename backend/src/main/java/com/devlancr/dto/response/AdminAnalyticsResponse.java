package com.devlancr.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class AdminAnalyticsResponse {
    private long totalUsers;
    private long activeUsers;
    private long totalProjects;
    private long openProjects;
    private long activeContracts;
    private long totalFreelancers;
    private long totalClients;
    private long openDisputes;
    private BigDecimal totalPlatformRevenue;
}
