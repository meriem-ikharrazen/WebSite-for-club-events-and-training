package com.project.elearning.entities;

import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "etudiantFormation")
public class EtudiantFormation {

	@EmbeddedId
    EtudiantFormationKey key;

	@ManyToOne
	@MapsId("idFormation")
    @JoinColumn(name = "id_formation")
    private Formation formation;;
	
	@ManyToOne
	@MapsId("idEtudiant")
    @JoinColumn(name = "id")
    private Etudiant etudiant;
    
    
	private Date dateInscription;
}
