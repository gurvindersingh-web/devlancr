package com.devlancr.repository;

import com.devlancr.entity.Project;
import com.devlancr.entity.enums.ExperienceLevel;
import com.devlancr.entity.enums.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByClientId(Long clientId);

    Page<Project> findByStatus(ProjectStatus status, Pageable pageable);

    @Query("SELECT p FROM Project p WHERE " +
            "(:status IS NULL OR p.status = :status) AND " +
            "(:minBudget IS NULL OR p.budgetMin >= :minBudget) AND " +
            "(:maxBudget IS NULL OR p.budgetMax <= :maxBudget) AND " +
            "(:level IS NULL OR p.experienceLevel = :level) AND " +
            "(:keyword IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Project> searchProjects(
            @Param("status") ProjectStatus status,
            @Param("minBudget") BigDecimal minBudget,
            @Param("maxBudget") BigDecimal maxBudget,
            @Param("level") ExperienceLevel level,
            @Param("keyword") String keyword,
            Pageable pageable);

    long countByStatus(ProjectStatus status);
}
