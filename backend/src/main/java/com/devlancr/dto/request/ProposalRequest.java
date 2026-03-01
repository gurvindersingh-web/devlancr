package com.devlancr.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProposalRequest {
    @NotNull
    private Long projectId;

    @NotBlank
    private String coverLetter;

    @NotNull
    @DecimalMin("1.0")
    private BigDecimal bidAmount;

    @NotNull
    @Min(1)
    private Integer deliveryDays;
}
