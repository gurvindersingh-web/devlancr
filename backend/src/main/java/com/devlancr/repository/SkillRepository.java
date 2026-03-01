package com.devlancr.repository;

import com.devlancr.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.Set;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    Optional<Skill> findByName(String name);

    Set<Skill> findByIdIn(Set<Long> ids);
}
