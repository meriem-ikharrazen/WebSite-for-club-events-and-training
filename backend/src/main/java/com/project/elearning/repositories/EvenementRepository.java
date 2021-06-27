package com.project.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.project.elearning.entities.Evenement;

public interface EvenementRepository extends JpaRepository<Evenement, Long> {

	Evenement findByLibele(String libele);
    boolean existsByLibele(String libele);
    
	@Query(value = "SELECT e FROM evenement e where e.libele like %:searchTxt%", nativeQuery = true)
  	List<Evenement> searchByLibele(@Param(value="searchTxt") String searchTxt);
}
