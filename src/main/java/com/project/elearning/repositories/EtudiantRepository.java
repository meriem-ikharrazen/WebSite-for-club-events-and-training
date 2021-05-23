package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Etudiant;

public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

}
