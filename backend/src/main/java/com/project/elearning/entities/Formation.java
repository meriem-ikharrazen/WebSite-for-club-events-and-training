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

@Entity
@Table(name = "formation")
public class Formation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_formation")
	private Long id;
	private String libele;
	private String description;
	private Date dateDebut;
	private Date dateFin;
	private Boolean status;
	private String image;
	private Date dateAjout;
	
	@OneToMany(mappedBy = "formation")
    private List<Examen> examens;
	
	@ManyToOne
    @JoinColumn(name = "id")
    private Formateur formateur;
	
	@OneToMany(mappedBy = "formation")
    private List<PartieFormation> parties;
	
	@ManyToOne
    @JoinColumn(name = "id_categorie")
    private CategorieFormation categorie;
	
	@ManyToOne
    @JoinColumn(name = "id_club")
    private Club club;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLibele() {
		return libele;
	}

	public void setLibele(String libele) {
		this.libele = libele;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(Date dateDebut) {
		this.dateDebut = dateDebut;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Date getDateAjout() {
		return dateAjout;
	}

	public void setDateAjout(Date dateAjout) {
		this.dateAjout = dateAjout;
	}

	public List<Examen> getExamens() {
		return examens;
	}

	public void setExamens(List<Examen> examens) {
		this.examens = examens;
	}

	public Formateur getFormateur() {
		return formateur;
	}

	public void setFormateur(Formateur formateur) {
		this.formateur = formateur;
	}

	public List<PartieFormation> getParties() {
		return parties;
	}

	public void setParties(List<PartieFormation> parties) {
		this.parties = parties;
	}

	public CategorieFormation getCategorie() {
		return categorie;
	}

	public void setCategorie(CategorieFormation categorie) {
		this.categorie = categorie;
	}

	public Club getClub() {
		return club;
	}

	public void setClub(Club club) {
		this.club = club;
	}
	
	
}
