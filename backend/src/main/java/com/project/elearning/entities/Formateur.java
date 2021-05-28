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
	private Boolean access;
	@Temporal(TemporalType.DATE)
	private Date dateAjout;
	
	@ManyToOne
    @JoinColumn(name = "id_organisation")
    private Organisation organisation;
	
	
	@OneToMany(mappedBy = "formateur")
	private List<Formation> formations;
}



