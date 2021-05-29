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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Entity
@Table(name = "formateur")
public class Formateur {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_formateur")
	private Long id;
	private String nom;
	private String prenom;
	private Character sexe;
	@Temporal(TemporalType.DATE)
	private Date dateNaissance;
	private String email;
	private String tel;
	private String password;
	private String diplome;
	private String specialite;
	private String image;
	private Boolean access = false;
	private Date dateAjout = new Date(System.currentTimeMillis());
	
	@ManyToOne
    @JoinColumn(name = "id_organisation")
    private Organisation organisation;
	
	
	@OneToMany(mappedBy = "formateur")
	private List<Formation> formations;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getPrenom() {
		return prenom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public Character getSexe() {
		return sexe;
	}


	public void setSexe(Character sexe) {
		this.sexe = sexe;
	}


	public Date getDateNaissance() {
		return dateNaissance;
	}


	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getTel() {
		return tel;
	}


	public void setTel(String tel) {
		this.tel = tel;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getDiplome() {
		return diplome;
	}


	public void setDiplome(String diplome) {
		this.diplome = diplome;
	}


	public String getSpecialite() {
		return specialite;
	}


	public void setSpecialite(String specialite) {
		this.specialite = specialite;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	public Boolean getAccess() {
		return access;
	}


	public void setAccess(Boolean access) {
		this.access = access;
	}


	public Date getDateAjout() {
		return dateAjout;
	}


	public void setDateAjout(Date dateAjout) {
		this.dateAjout = dateAjout;
	}


	public Organisation getOrganisation() {
		return organisation;
	}


	public void setOrganisation(Organisation organisation) {
		this.organisation = organisation;
	}


	public List<Formation> getFormations() {
		return formations;
	}


	public void setFormations(List<Formation> formations) {
		this.formations = formations;
	}
	
	
	
	
}



