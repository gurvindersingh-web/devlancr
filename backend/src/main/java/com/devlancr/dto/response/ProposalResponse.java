package com.devlancr.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class ProposalResponse {
    private Long id;
    private Long projectId;
    private String projectTitle;
    private Long freelancerId;
    private String freelancerName;
    private String freelancerTitle;
    private BigDecimal freelancerRating;
    private String coverLetter;
    private BigDecimal bidAmount;
    private Integer deliveryDays;
    private String status;
    private LocalDateTime createdAt;
}
