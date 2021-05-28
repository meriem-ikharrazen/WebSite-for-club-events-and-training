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
    @JoinColumn(name = "id_formateur")
    private Formateur formateur;
	
	@OneToMany(mappedBy = "formation")
    private List<PartieFormation> parties;
	
	@ManyToOne
    @JoinColumn(name = "id_categorie")
    private CategorieFormation categorie;
	
	@ManyToOne
    @JoinColumn(name = "id_club")
    private Club club;
}
