package com.project.elearning.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Organisation;
import com.project.elearning.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(String name);
	Role findRoleByName(String name);
}

