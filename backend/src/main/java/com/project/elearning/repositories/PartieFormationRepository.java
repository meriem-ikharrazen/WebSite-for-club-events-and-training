package com.project.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Formation;
import com.project.elearning.entities.PartieFormation;

public interface PartieFormationRepository extends JpaRepository<PartieFormation, Long> {
	List<PartieFormation> findByFormation(Formation formation);
}
