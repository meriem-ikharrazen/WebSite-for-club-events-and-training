package com.project.elearning.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "etudiantFormation")
public class EtudiantFormation implements Serializable {

	@EmbeddedId
    private EtudiantFormationKey key;

	@ManyToOne
	@MapsId("idFormation")
    @JoinColumn(name = "id_formation")
    private Formation formation;
	
	@ManyToOne
	@MapsId("idEtudiant")
    @JoinColumn(name = "id")
    private Etudiant etudiant;
    
	
    
	public EtudiantFormation() {
		super();
	}



	public EtudiantFormation(EtudiantFormationKey key, Formation formation, Etudiant etudiant, Date dateInscription) {
		super();
		this.key = new EtudiantFormationKey(formation.getId(),etudiant.getId());
		this.formation = formation;
		this.etudiant = etudiant;
		this.dateInscription = dateInscription;
	}


	private Date dateInscription = new Date(System.currentTimeMillis());
	
	public Formation getFormation() {
		return formation;
	}

	

	public void setFormation(Formation formation) {
		this.formation = formation;
	}


	public Etudiant getEtudiant() {
		return etudiant;
	}


	public void setEtudiant(Etudiant etudiant) {
		this.etudiant = etudiant;
	}


	public Date getDateInscription() {
		return dateInscription;
	}


	public void setDateInscription(Date dateInscription) {
		this.dateInscription = dateInscription;
	}


	public EtudiantFormationKey getKey() {
		return key;
	}


	public void setKey(EtudiantFormationKey key) {
		this.key = key;
	}
	
	
	
}
