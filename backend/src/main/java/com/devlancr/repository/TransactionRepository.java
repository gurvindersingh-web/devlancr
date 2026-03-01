package com.devlancr.repository;

import com.devlancr.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByWalletIdOrderByCreatedAtDesc(Long walletId);

    @Query("SELECT COALESCE(SUM(t.platformFee), 0) FROM Transaction t WHERE t.status = 'COMPLETED'")
    BigDecimal getTotalPlatformFees();
}
