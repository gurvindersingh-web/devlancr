package com.devlancr.service;

import com.devlancr.dto.request.ProjectRequest;
import com.devlancr.dto.response.ProjectResponse;
import com.devlancr.entity.*;
import com.devlancr.entity.enums.*;
import com.devlancr.exception.*;
import com.devlancr.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ClientProfileRepository clientProfileRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    @Transactional
    public ProjectResponse createProject(String email, ProjectRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        ClientProfile client = clientProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new UnauthorizedException("Only clients can create projects"));

        Project project = Project.builder()
                .client(client)
                .title(request.getTitle())
                .description(request.getDescription())
                .projectType(ProjectType.valueOf(request.getProjectType().toUpperCase()))
                .budgetMin(request.getBudgetMin())
                .budgetMax(request.getBudgetMax())
                .experienceLevel(request.getExperienceLevel() != null
                        ? ExperienceLevel.valueOf(request.getExperienceLevel().toUpperCase())
                        : ExperienceLevel.INTERMEDIATE)
                .deadline(request.getDeadline())
                .build();

        if (request.getSkillIds() != null && !request.getSkillIds().isEmpty()) {
            project.setSkills(skillRepository.findByIdIn(request.getSkillIds()));
        }

        project = projectRepository.save(project);
        client.setTotalProjectsPosted(client.getTotalProjectsPosted() + 1);
        clientProfileRepository.save(client);

        return mapToResponse(project);
    }

    public ProjectResponse getProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        return mapToResponse(project);
    }

    public Page<ProjectResponse> searchProjects(String keyword, String status, BigDecimal minBudget,
            BigDecimal maxBudget, String level, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        ProjectStatus ps = status != null ? ProjectStatus.valueOf(status.toUpperCase()) : null;
        ExperienceLevel el = level != null ? ExperienceLevel.valueOf(level.toUpperCase()) : null;

        Page<Project> projects = projectRepository.searchProjects(ps, minBudget, maxBudget, el, keyword, pageable);
        return projects.map(this::mapToResponse);
    }

    public List<ProjectResponse> getClientProjects(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        ClientProfile client = clientProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Client profile not found"));
        return projectRepository.findByClientId(client.getId()).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public ProjectResponse updateProject(Long id, String email, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!project.getClient().getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to edit this project");
        }

        if (request.getTitle() != null)
            project.setTitle(request.getTitle());
        if (request.getDescription() != null)
            project.setDescription(request.getDescription());
        if (request.getBudgetMin() != null)
            project.setBudgetMin(request.getBudgetMin());
        if (request.getBudgetMax() != null)
            project.setBudgetMax(request.getBudgetMax());
        if (request.getDeadline() != null)
            project.setDeadline(request.getDeadline());
        if (request.getSkillIds() != null)
            project.setSkills(skillRepository.findByIdIn(request.getSkillIds()));

        return mapToResponse(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long id, String email) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!project.getClient().getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("Not authorized to delete this project");
        }
        projectRepository.delete(project);
    }

    private ProjectResponse mapToResponse(Project project) {
        User clientUser = project.getClient().getUser();
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .projectType(project.getProjectType().name())
                .budgetMin(project.getBudgetMin())
                .budgetMax(project.getBudgetMax())
                .status(project.getStatus().name())
                .experienceLevel(project.getExperienceLevel().name())
                .deadline(project.getDeadline())
                .totalProposals(project.getTotalProposals())
                .skills(project.getSkills().stream().map(Skill::getName).collect(Collectors.toSet()))
                .clientName(clientUser.getFirstName() + " " + clientUser.getLastName())
                .clientUserId(clientUser.getId())
                .createdAt(project.getCreatedAt())
                .build();
    }
}
