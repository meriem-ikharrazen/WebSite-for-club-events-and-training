package com.project.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.elearning.entities.Formateur;
import com.project.elearning.entities.Formation;

public interface FormationRepository extends JpaRepository<Formation, Long> {
    
   List<Formation> findByFormateur(Formateur formateur);
}
