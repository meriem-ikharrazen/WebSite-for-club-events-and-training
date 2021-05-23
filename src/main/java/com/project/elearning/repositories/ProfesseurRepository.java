package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Professeur;

public interface ProfesseurRepository extends JpaRepository<Professeur, Long> {

}
