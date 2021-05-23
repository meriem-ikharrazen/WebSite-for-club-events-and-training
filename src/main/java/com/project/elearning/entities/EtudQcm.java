package com.project.elearning.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "etudQcm")
public class EtudQcm {

	@EmbeddedId
    EtudiantQcmKey key;

	@ManyToOne
	@MapsId("idQcm")
    @JoinColumn(name = "id_qcm")
    private Qcm qcm;
	
	@ManyToOne
	@MapsId("idEtudiant")
    @JoinColumn(name = "id_etudiant")
    private Etudiant etudiant;
    
    
	private Date dateAjout;
	private float note;
	
}
