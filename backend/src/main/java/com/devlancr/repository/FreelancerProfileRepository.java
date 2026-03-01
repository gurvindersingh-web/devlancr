package com.devlancr.repository;

import com.devlancr.entity.FreelancerProfile;
import com.devlancr.entity.enums.ExperienceLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.Optional;

public interface FreelancerProfileRepository extends JpaRepository<FreelancerProfile, Long> {
    Optional<FreelancerProfile> findByUserId(Long userId);

    @Query("SELECT f FROM FreelancerProfile f WHERE " +
            "(:minRate IS NULL OR f.hourlyRate >= :minRate) AND " +
            "(:maxRate IS NULL OR f.hourlyRate <= :maxRate) AND " +
            "(:level IS NULL OR f.experienceLevel = :level) AND " +
            "(:minRating IS NULL OR f.avgRating >= :minRating)")
    Page<FreelancerProfile> searchFreelancers(
            @Param("minRate") BigDecimal minRate,
            @Param("maxRate") BigDecimal maxRate,
            @Param("level") ExperienceLevel level,
            @Param("minRating") BigDecimal minRating,
            Pageable pageable);
}
