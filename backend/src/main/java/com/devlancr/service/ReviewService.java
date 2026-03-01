package com.devlancr.service;

import com.devlancr.dto.request.ReviewRequest;
import com.devlancr.entity.*;
import com.devlancr.entity.enums.NotificationType;
import com.devlancr.exception.*;
import com.devlancr.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ContractRepository contractRepository;
    private final UserRepository userRepository;
    private final FreelancerProfileRepository freelancerProfileRepository;
    private final NotificationService notificationService;

    @Transactional
    public Review createReview(String email, ReviewRequest request) {
        User reviewer = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Contract contract = contractRepository.findById(request.getContractId())
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        if (reviewRepository.existsByContractIdAndReviewerId(contract.getId(), reviewer.getId())) {
            throw new BadRequestException("You already reviewed this contract");
        }

        Long clientUserId = contract.getClient().getUser().getId();
        Long freelancerUserId = contract.getFreelancer().getUser().getId();

        if (!reviewer.getId().equals(clientUserId) && !reviewer.getId().equals(freelancerUserId)) {
            throw new UnauthorizedException("Not authorized to review this contract");
        }

        Long revieweeId = reviewer.getId().equals(clientUserId) ? freelancerUserId : clientUserId;
        User reviewee = userRepository.findById(revieweeId)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewee not found"));

        Review review = Review.builder()
                .contract(contract)
                .reviewer(reviewer)
                .reviewee(reviewee)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        review = reviewRepository.save(review);

        // Update freelancer avg rating if reviewed
        FreelancerProfile fp = freelancerProfileRepository.findByUserId(revieweeId).orElse(null);
        if (fp != null) {
            Double avgRating = reviewRepository.getAverageRatingForUser(revieweeId);
            fp.setAvgRating(avgRating != null ? BigDecimal.valueOf(avgRating) : BigDecimal.ZERO);
            fp.setTotalReviews(fp.getTotalReviews() + 1);
            freelancerProfileRepository.save(fp);
        }

        notificationService.createNotification(
                revieweeId, "New Review",
                reviewer.getFirstName() + " left you a " + request.getRating() + "-star review",
                NotificationType.REVIEW_RECEIVED, review.getId());

        return review;
    }

    public List<Review> getUserReviews(Long userId) {
        return reviewRepository.findByRevieweeId(userId);
    }
}
