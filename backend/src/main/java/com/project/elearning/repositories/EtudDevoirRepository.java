package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.EtudDevoir;
import com.project.elearning.entities.EtudDevoirKey;

public interface EtudDevoirRepository extends JpaRepository<EtudDevoir, EtudDevoirKey> {

}
