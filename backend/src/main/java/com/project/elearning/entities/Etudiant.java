package com.project.elearning.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "etudiant")
public class Etudiant extends User {
	private String cne;
	@Temporal(TemporalType.DATE)
	private Date dateNaissance;
	private String tel;
	private String niveau;
	private String diplomePrepare;
	
	@OneToMany(mappedBy = "etudiant")
    private Set<EtudiantExamen> etudiantExamen;


	public String getCne() {
		return cne;
	}

	public void setCne(String cne) {
		this.cne = cne;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getNiveau() {
		return niveau;
	}

	public void setNiveau(String niveau) {
		this.niveau = niveau;
	}

	public String getDiplomePrepare() {
		return diplomePrepare;
	}

	public void setDiplomePrepare(String diplomePrepare) {
		this.diplomePrepare = diplomePrepare;
	}

	public Set<EtudiantExamen> getEtudiantExamen() {
		return etudiantExamen;
	}

	public void setEtudiantExamen(Set<EtudiantExamen> etudiantExamen) {
		this.etudiantExamen = etudiantExamen;
	}

	
}
