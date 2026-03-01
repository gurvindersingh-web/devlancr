package com.devlancr.controller;

import com.devlancr.dto.request.FreelancerProfileRequest;
import com.devlancr.dto.response.*;
import com.devlancr.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(Authentication auth) {
        UserResponse user = userService.getUserByEmail(auth.getName());
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUser(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/freelancer/profile")
    public ResponseEntity<ApiResponse<FreelancerProfileResponse>> updateFreelancerProfile(
            Authentication auth, @Valid @RequestBody FreelancerProfileRequest request) {
        FreelancerProfileResponse profile = userService.updateFreelancerProfile(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated", profile));
    }
}
