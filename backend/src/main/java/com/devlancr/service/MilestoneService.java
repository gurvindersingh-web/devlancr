package com.devlancr.service;

import com.devlancr.dto.request.MilestoneRequest;
import com.devlancr.entity.*;
import com.devlancr.entity.enums.*;
import com.devlancr.exception.*;
import com.devlancr.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final ContractRepository contractRepository;
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final FreelancerProfileRepository freelancerProfileRepository;
    private final NotificationService notificationService;

    @Value("${app.platform.fee-percentage}")
    private int platformFeePercentage;

    @Transactional
    public Milestone createMilestone(String email, MilestoneRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Contract contract = contractRepository.findById(request.getContractId())
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        if (!contract.getClient().getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Only the client can create milestones");
        }

        Milestone milestone = Milestone.builder()
                .contract(contract)
                .title(request.getTitle())
                .description(request.getDescription())
                .amount(request.getAmount())
                .dueDate(request.getDueDate())
                .build();

        return milestoneRepository.save(milestone);
    }

    public List<Milestone> getContractMilestones(Long contractId) {
        return milestoneRepository.findByContractId(contractId);
    }

    @Transactional
    public Milestone fundMilestone(Long milestoneId, String email) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new ResourceNotFoundException("Milestone not found"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!milestone.getContract().getClient().getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Only the client can fund milestones");
        }

        Wallet clientWallet = walletRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found"));

        if (clientWallet.getBalance().compareTo(milestone.getAmount()) < 0) {
            throw new BadRequestException("Insufficient wallet balance");
        }

        // Deduct from client wallet, add to escrow
        clientWallet.setBalance(clientWallet.getBalance().subtract(milestone.getAmount()));
        clientWallet.setEscrowBalance(clientWallet.getEscrowBalance().add(milestone.getAmount()));
        walletRepository.save(clientWallet);

        // Record transaction
        Transaction txn = Transaction.builder()
                .wallet(clientWallet)
                .milestone(milestone)
                .amount(milestone.getAmount())
                .transactionType(TransactionType.ESCROW_FUND)
                .status(TransactionStatus.COMPLETED)
                .description("Escrow funded for milestone: " + milestone.getTitle())
                .build();
        transactionRepository.save(txn);

        milestone.setStatus(MilestoneStatus.FUNDED);
        return milestoneRepository.save(milestone);
    }

    @Transactional
    public Milestone releaseMilestone(Long milestoneId, String email) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new ResourceNotFoundException("Milestone not found"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Contract contract = milestone.getContract();

        if (!contract.getClient().getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Only the client can release payments");
        }

        if (milestone.getStatus() != MilestoneStatus.FUNDED && milestone.getStatus() != MilestoneStatus.SUBMITTED) {
            throw new BadRequestException("Milestone must be funded or submitted before release");
        }

        BigDecimal amount = milestone.getAmount();
        BigDecimal fee = amount.multiply(BigDecimal.valueOf(platformFeePercentage))
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal netAmount = amount.subtract(fee);

        // Remove from client escrow
        Wallet clientWallet = walletRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Client wallet not found"));
        clientWallet.setEscrowBalance(clientWallet.getEscrowBalance().subtract(amount));
        walletRepository.save(clientWallet);

        // Add to freelancer wallet
        User freelancerUser = contract.getFreelancer().getUser();
        Wallet freelancerWallet = walletRepository.findByUserId(freelancerUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Freelancer wallet not found"));
        freelancerWallet.setBalance(freelancerWallet.getBalance().add(netAmount));
        walletRepository.save(freelancerWallet);

        // Update freelancer earnings
        FreelancerProfile fp = contract.getFreelancer();
        fp.setTotalEarnings(fp.getTotalEarnings().add(netAmount));
        freelancerProfileRepository.save(fp);

        // Record transactions
        Transaction releaseTxn = Transaction.builder()
                .wallet(freelancerWallet).milestone(milestone).amount(netAmount)
                .platformFee(fee).transactionType(TransactionType.ESCROW_RELEASE)
                .status(TransactionStatus.COMPLETED)
                .description("Payment released for milestone: " + milestone.getTitle())
                .build();
        transactionRepository.save(releaseTxn);

        milestone.setStatus(MilestoneStatus.RELEASED);

        notificationService.createNotification(
                freelancerUser.getId(), "Payment Released",
                "Payment of $" + netAmount + " released for \"" + milestone.getTitle() + "\"",
                NotificationType.PAYMENT_RELEASED, milestone.getId());

        return milestoneRepository.save(milestone);
    }
}
