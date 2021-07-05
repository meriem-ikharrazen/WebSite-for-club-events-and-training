package com.project.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.elearning.entities.Etudiant;
import com.project.elearning.entities.EtudiantFormation;
import com.project.elearning.entities.EtudiantFormationKey;
import com.project.elearning.entities.Formation;

public interface EtudiantFormationRepository extends JpaRepository<EtudiantFormation, EtudiantFormationKey> {

	@Query(value = "SELECT ef FROM etudiant_formation ef where ef.id_etudiant==:idEtud and ef.id_formation==:idForm", nativeQuery = true)
	EtudiantFormation searchByIdEtudAndIdForm(@Param(value="idEtud") Long idEtud,@Param(value="idForm") Long idForm);
	
	
	@Query(value = "DELETE ef FROM etudiant_formation ef where ef.id_etudiant==:idEtud and ef.id_formation==:idForm", nativeQuery = true)
	void deleteByIdEtudAndIdForm(@Param(value="idEtud") Long idEtud,@Param(value="idForm") Long idForm);
	
	List<EtudiantFormation> findByFormation(Formation formation);
}
