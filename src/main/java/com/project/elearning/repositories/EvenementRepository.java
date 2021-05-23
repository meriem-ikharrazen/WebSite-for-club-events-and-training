package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Evenement;

public interface EvenementRepository extends JpaRepository<Evenement, Long> {

}
