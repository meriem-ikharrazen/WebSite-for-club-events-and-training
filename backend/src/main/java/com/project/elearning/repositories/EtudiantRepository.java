package com.project.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.elearning.entities.Etudiant;

public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
	Etudiant findByCne(String cne);
    boolean existsByCne(String cne);
	@Query(value = "SELECT e FROM etudiant e where e.cne like %:searchTxt%", nativeQuery = true)
  	List<Etudiant> searchByCne(@Param(value="searchTxt") String searchTxt);

}
