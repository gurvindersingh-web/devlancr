package com.devlancr.controller;

import com.devlancr.dto.request.ReviewRequest;
import com.devlancr.dto.response.ApiResponse;
import com.devlancr.entity.Review;
import com.devlancr.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ApiResponse<Review>> createReview(
            Authentication auth, @Valid @RequestBody ReviewRequest request) {
        Review review = reviewService.createReview(auth.getName(), request);
        return ResponseEntity.ok(ApiResponse.success("Review submitted", review));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Review>>> getUserReviews(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.getUserReviews(userId)));
    }
}
