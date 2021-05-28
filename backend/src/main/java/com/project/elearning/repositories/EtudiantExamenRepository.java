package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.EtudiantExamen;
import com.project.elearning.entities.EtudiantExamenKey;

public interface EtudiantExamenRepository extends JpaRepository<EtudiantExamen, EtudiantExamenKey> {

}
