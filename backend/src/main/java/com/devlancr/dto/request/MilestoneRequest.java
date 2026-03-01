package com.devlancr.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class MilestoneRequest {
    @NotNull
    private Long contractId;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal amount;

    private LocalDateTime dueDate;
}
