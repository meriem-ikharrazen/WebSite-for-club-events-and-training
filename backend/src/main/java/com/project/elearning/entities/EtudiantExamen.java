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
@Table(name = "etudiantExamen")
public class EtudiantExamen {

	@EmbeddedId
    EtudiantExamenKey key;

	@ManyToOne
	@MapsId("idExamen")
    @JoinColumn(name = "id_examen")
    private Examen examen;
	
	@ManyToOne
	@MapsId("idEtudiant")
    @JoinColumn(name = "id")
    private Etudiant etudiant;
    
    
	private Date dateAjout;
	private float note;
	private String url_cerificate;
	
}
