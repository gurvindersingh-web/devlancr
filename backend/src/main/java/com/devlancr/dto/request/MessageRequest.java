package com.devlancr.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class MessageRequest {
    @NotNull
    private Long contractId;

    @NotBlank
    private String content;
}
