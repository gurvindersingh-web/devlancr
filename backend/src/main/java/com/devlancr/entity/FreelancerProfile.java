package com.devlancr.entity;

import com.devlancr.entity.enums.ExperienceLevel;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "freelancer_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FreelancerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "hourly_rate")
    @Builder.Default
    private BigDecimal hourlyRate = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience_level")
    @Builder.Default
    private ExperienceLevel experienceLevel = ExperienceLevel.ENTRY;

    @Column(name = "portfolio_url")
    private String portfolioUrl;

    @Column(name = "avg_rating")
    @Builder.Default
    private BigDecimal avgRating = BigDecimal.ZERO;

    @Column(name = "total_reviews")
    @Builder.Default
    private Integer totalReviews = 0;

    @Column(name = "total_earnings")
    @Builder.Default
    private BigDecimal totalEarnings = BigDecimal.ZERO;

    @Column(name = "is_available")
    @Builder.Default
    private Boolean isAvailable = true;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "freelancer_skills", joinColumns = @JoinColumn(name = "freelancer_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @Builder.Default
    private Set<Skill> skills = new HashSet<>();

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
