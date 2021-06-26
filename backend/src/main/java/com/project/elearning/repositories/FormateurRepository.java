package com.project.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.project.elearning.entities.Formateur;

public interface FormateurRepository extends JpaRepository<Formateur, Long> {
	Formateur findByEmail(String email);
    boolean existsByEmail(String email);
//    @Query(value = "SELECT * FROM formateur WHERE email like %:searchTxt% OR nom like %:searchTxt% OR prenom like %:searchTxt%", nativeQuery = true)
//	List<Formateur> searchByEmailNom(@Param(value="searchTxt") String searchTxt);

    @Query(value = "SELECT f FROM formateur f where f.nom like %:searchTxt%", nativeQuery = true)
  	List<Formateur> searchByEmailNom(@Param(value="searchTxt") String searchTxt);
    
//    @Query(value = "SELECT * FROM formateur WHERE email like %?1% OR nom like %?1% OR prenom like %?1%", nativeQuery = true)
//  	List<Formateur> searchByEmailNom(String searchTxt);

}
