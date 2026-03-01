package com.devlancr.controller;

import com.devlancr.dto.request.MessageRequest;
import com.devlancr.dto.response.ApiResponse;
import com.devlancr.entity.Message;
import com.devlancr.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<ApiResponse<Message>> sendMessage(
            Authentication auth, @Valid @RequestBody MessageRequest request) {
        Message message = messageService.sendMessage(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Message sent", message));
    }

    @GetMapping("/contract/{contractId}")
    public ResponseEntity<ApiResponse<List<Message>>> getContractMessages(
            @PathVariable Long contractId, Authentication auth) {
        return ResponseEntity.ok(ApiResponse.success(messageService.getContractMessages(contractId, auth.getName())));
    }
}
