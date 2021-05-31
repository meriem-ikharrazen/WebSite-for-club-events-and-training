package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Formateur;
import com.project.elearning.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
    boolean existsByEmail(String email);
}