package com.devlancr.controller;

import com.devlancr.dto.request.WalletRequest;
import com.devlancr.dto.response.ApiResponse;
import com.devlancr.entity.Transaction;
import com.devlancr.entity.Wallet;
import com.devlancr.service.WalletService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @GetMapping
    public ResponseEntity<ApiResponse<Wallet>> getWallet(Authentication auth) {
        return ResponseEntity.ok(ApiResponse.success(walletService.getWallet(auth.getName())));
    }

    @PostMapping("/deposit")
    public ResponseEntity<ApiResponse<Wallet>> deposit(
            Authentication auth, @Valid @RequestBody WalletRequest request) {
        return ResponseEntity
                .ok(ApiResponse.success("Deposit successful", walletService.deposit(auth.getName(), request)));
    }

    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactions(Authentication auth) {
        return ResponseEntity.ok(ApiResponse.success(walletService.getTransactions(auth.getName())));
    }
}
