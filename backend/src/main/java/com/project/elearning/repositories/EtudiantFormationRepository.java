package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.EtudiantFormation;
import com.project.elearning.entities.EtudiantFormationKey;

public interface EtudiantFormationRepository extends JpaRepository<EtudiantFormation, EtudiantFormationKey> {

}
