package com.devlancr.service;

import com.devlancr.dto.request.FreelancerProfileRequest;
import com.devlancr.dto.response.*;
import com.devlancr.entity.*;
import com.devlancr.exception.ResourceNotFoundException;
import com.devlancr.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FreelancerProfileRepository freelancerProfileRepository;
    private final ClientProfileRepository clientProfileRepository;
    private final SkillRepository skillRepository;

    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToUserResponse(user);
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToUserResponse(user);
    }

    @Transactional
    public FreelancerProfileResponse updateFreelancerProfile(String email, FreelancerProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        FreelancerProfile profile = freelancerProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Freelancer profile not found"));

        if (request.getTitle() != null)
            profile.setTitle(request.getTitle());
        if (request.getBio() != null)
            profile.setBio(request.getBio());
        if (request.getHourlyRate() != null)
            profile.setHourlyRate(request.getHourlyRate());
        if (request.getExperienceLevel() != null) {
            profile.setExperienceLevel(
                    com.devlancr.entity.enums.ExperienceLevel.valueOf(request.getExperienceLevel().toUpperCase()));
        }
        if (request.getPortfolioUrl() != null)
            profile.setPortfolioUrl(request.getPortfolioUrl());
        if (request.getSkillIds() != null && !request.getSkillIds().isEmpty()) {
            profile.setSkills(skillRepository.findByIdIn(request.getSkillIds()));
        }

        profile = freelancerProfileRepository.save(profile);
        return mapToFreelancerResponse(profile);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void toggleUserStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setIsActive(!user.getIsActive());
        userRepository.save(user);
    }

    private UserResponse mapToUserResponse(User user) {
        FreelancerProfileResponse fpRes = null;
        ClientProfileResponse cpRes = null;

        if (user.getFreelancerProfile() != null) {
            fpRes = mapToFreelancerResponse(user.getFreelancerProfile());
        }
        if (user.getClientProfile() != null) {
            cpRes = ClientProfileResponse.builder()
                    .id(user.getClientProfile().getId())
                    .userId(user.getId())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .companyName(user.getClientProfile().getCompanyName())
                    .companyDescription(user.getClientProfile().getCompanyDescription())
                    .website(user.getClientProfile().getWebsite())
                    .totalSpent(user.getClientProfile().getTotalSpent())
                    .totalProjectsPosted(user.getClientProfile().getTotalProjectsPosted())
                    .build();
        }

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatarUrl(user.getAvatarUrl())
                .phone(user.getPhone())
                .isActive(user.getIsActive())
                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                .freelancerProfile(fpRes)
                .clientProfile(cpRes)
                .build();
    }

    public static FreelancerProfileResponse mapToFreelancerResponse(FreelancerProfile profile) {
        return FreelancerProfileResponse.builder()
                .id(profile.getId())
                .userId(profile.getUser().getId())
                .firstName(profile.getUser().getFirstName())
                .lastName(profile.getUser().getLastName())
                .avatarUrl(profile.getUser().getAvatarUrl())
                .title(profile.getTitle())
                .bio(profile.getBio())
                .hourlyRate(profile.getHourlyRate())
                .experienceLevel(profile.getExperienceLevel().name())
                .portfolioUrl(profile.getPortfolioUrl())
                .avgRating(profile.getAvgRating())
                .totalReviews(profile.getTotalReviews())
                .totalEarnings(profile.getTotalEarnings())
                .isAvailable(profile.getIsAvailable())
                .skills(profile.getSkills().stream().map(Skill::getName).collect(Collectors.toSet()))
                .build();
    }
}
