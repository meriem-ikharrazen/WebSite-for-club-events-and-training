package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.EtudQcm;
import com.project.elearning.entities.EtudiantQcmKey;

public interface EtudQcmRepository extends JpaRepository<EtudQcm, EtudiantQcmKey> {

}
