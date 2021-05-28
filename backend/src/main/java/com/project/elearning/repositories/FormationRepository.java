package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Formation;

public interface FormationRepository extends JpaRepository<Formation, Long> {

}
