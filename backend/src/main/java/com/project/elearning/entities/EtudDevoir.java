package com.project.elearning.entities;

import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "etudDevoir")
public class EtudDevoir {
	@EmbeddedId
    EtudDevoirKey key;

	@ManyToOne
	@MapsId("idDevoir")
    @JoinColumn(name = "id_devoir")
    private Devoir devoir;
	
	@ManyToOne
	@MapsId("idEtudiant")
    @JoinColumn(name = "id_etudiant")
    private Etudiant etudiant;
    
    
	private Date dateAjout;
	private float note;
}
