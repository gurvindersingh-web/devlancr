package com.devlancr.repository;

import com.devlancr.entity.Contract;
import com.devlancr.entity.enums.ContractStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long> {
    List<Contract> findByClientId(Long clientId);

    List<Contract> findByFreelancerId(Long freelancerId);

    long countByStatus(ContractStatus status);
}
