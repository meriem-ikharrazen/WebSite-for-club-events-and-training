package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.EtudiantClubKey;
import com.project.elearning.entities.Role;

public interface RoleRepository extends JpaRepository<Role, EtudiantClubKey> {

}
