package com.devlancr.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class ClientProfileResponse {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String companyName;
    private String companyDescription;
    private String website;
    private BigDecimal totalSpent;
    private Integer totalProjectsPosted;
}
