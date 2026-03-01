package com.devlancr.service;

import com.devlancr.dto.request.ProposalRequest;
import com.devlancr.dto.response.ProposalResponse;
import com.devlancr.entity.*;
import com.devlancr.entity.enums.*;
import com.devlancr.exception.*;
import com.devlancr.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProposalService {

    private final ProposalRepository proposalRepository;
    private final ProjectRepository projectRepository;
    private final FreelancerProfileRepository freelancerProfileRepository;
    private final UserRepository userRepository;
    private final ContractRepository contractRepository;
    private final NotificationService notificationService;

    @Transactional
    public ProposalResponse submitProposal(String email, ProposalRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        FreelancerProfile freelancer = freelancerProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new UnauthorizedException("Only freelancers can submit proposals"));
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        if (project.getStatus() != ProjectStatus.OPEN) {
            throw new BadRequestException("Project is not accepting proposals");
        }
        if (proposalRepository.existsByProjectIdAndFreelancerId(project.getId(), freelancer.getId())) {
            throw new BadRequestException("You already submitted a proposal for this project");
        }

        Proposal proposal = Proposal.builder()
                .project(project)
                .freelancer(freelancer)
                .coverLetter(request.getCoverLetter())
                .bidAmount(request.getBidAmount())
                .deliveryDays(request.getDeliveryDays())
                .build();

        proposal = proposalRepository.save(proposal);
        project.setTotalProposals(project.getTotalProposals() + 1);
        projectRepository.save(project);

        notificationService.createNotification(
                project.getClient().getUser().getId(),
                "New Proposal Received",
                user.getFirstName() + " submitted a proposal for \"" + project.getTitle() + "\"",
                NotificationType.PROPOSAL_RECEIVED,
                proposal.getId());

        return mapToResponse(proposal);
    }

    public List<ProposalResponse> getProjectProposals(Long projectId) {
        return proposalRepository.findByProjectId(projectId).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<ProposalResponse> getFreelancerProposals(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        FreelancerProfile freelancer = freelancerProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Freelancer profile not found"));
        return proposalRepository.findByFreelancerId(freelancer.getId()).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public ProposalResponse acceptProposal(Long proposalId, String email) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal not found"));
        Project project = proposal.getProject();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!project.getClient().getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Only the project owner can accept proposals");
        }

        proposal.setStatus(ProposalStatus.ACCEPTED);
        proposalRepository.save(proposal);

        // Create contract
        Contract contract = Contract.builder()
                .project(project)
                .client(project.getClient())
                .freelancer(proposal.getFreelancer())
                .proposal(proposal)
                .totalAmount(proposal.getBidAmount())
                .build();
        contractRepository.save(contract);

        project.setStatus(ProjectStatus.IN_PROGRESS);
        projectRepository.save(project);

        // Reject other proposals
        proposalRepository.findByProjectId(project.getId()).stream()
                .filter(p -> !p.getId().equals(proposalId) && p.getStatus() == ProposalStatus.PENDING)
                .forEach(p -> {
                    p.setStatus(ProposalStatus.REJECTED);
                    proposalRepository.save(p);
                });

        notificationService.createNotification(
                proposal.getFreelancer().getUser().getId(),
                "Proposal Accepted!",
                "Your proposal for \"" + project.getTitle() + "\" has been accepted!",
                NotificationType.PROJECT_AWARDED,
                contract.getId());

        return mapToResponse(proposal);
    }

    private ProposalResponse mapToResponse(Proposal proposal) {
        FreelancerProfile fp = proposal.getFreelancer();
        return ProposalResponse.builder()
                .id(proposal.getId())
                .projectId(proposal.getProject().getId())
                .projectTitle(proposal.getProject().getTitle())
                .freelancerId(fp.getId())
                .freelancerName(fp.getUser().getFirstName() + " " + fp.getUser().getLastName())
                .freelancerTitle(fp.getTitle())
                .freelancerRating(fp.getAvgRating())
                .coverLetter(proposal.getCoverLetter())
                .bidAmount(proposal.getBidAmount())
                .deliveryDays(proposal.getDeliveryDays())
                .status(proposal.getStatus().name())
                .createdAt(proposal.getCreatedAt())
                .build();
    }
}
