package com.devlancr.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class DashboardResponse {
    private long totalProjects;
    private long activeContracts;
    private long pendingProposals;
    private BigDecimal totalEarnings;
    private BigDecimal walletBalance;
    private long unreadNotifications;
    private long unreadMessages;
}
