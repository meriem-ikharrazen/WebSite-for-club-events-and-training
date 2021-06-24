package com.project.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.elearning.entities.Club;

public interface ClubRepository extends JpaRepository<Club, Long> {

	Club findByDesignation(String nom);
    boolean existsByDesignation(String nom);
    
	@Query(value = "SELECT c FROM club c where c.designation like %:searchTxt%", nativeQuery = true)
  	List<Club> searchByNom(@Param(value="searchTxt") String searchTxt);
}
