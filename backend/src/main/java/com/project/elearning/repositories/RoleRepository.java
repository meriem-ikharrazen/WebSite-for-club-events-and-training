package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Organisation;
import com.project.elearning.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Role findByName(String name);

}

