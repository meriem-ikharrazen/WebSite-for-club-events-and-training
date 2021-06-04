package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Administrateur;
import com.project.elearning.entities.Formateur;

public interface AdministrateurRepository extends JpaRepository<Administrateur, Long> {
	Administrateur findByEmail(String email);
    boolean existsByEmail(String email);
}
