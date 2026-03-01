package com.devlancr.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private String phone;
    private Boolean isActive;
    private List<String> roles;
    private FreelancerProfileResponse freelancerProfile;
    private ClientProfileResponse clientProfile;
}
