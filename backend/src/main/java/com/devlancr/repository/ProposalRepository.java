package com.devlancr.repository;

import com.devlancr.entity.Proposal;
import com.devlancr.entity.enums.ProposalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
    List<Proposal> findByProjectId(Long projectId);

    List<Proposal> findByFreelancerId(Long freelancerId);

    boolean existsByProjectIdAndFreelancerId(Long projectId, Long freelancerId);

    long countByStatus(ProposalStatus status);
}
