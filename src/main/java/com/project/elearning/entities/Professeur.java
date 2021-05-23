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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "professeur")
public class Professeur {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_professeur")
	private Long id;
	private String nomProfesseur;
	private String prenomProfesseur;
	private Character sexeProfesseur;
	@Temporal(TemporalType.DATE)
	private Date dateNaissance;
	private String emailProfesseur;
	private String telProfesseur;
	private String passwordProfesseur;
	private String grade;
	private String diplomeProfesseur;
	private String specialite;
	private String imageProfesseur;
	
	
	@OneToMany(mappedBy = "professeur")
    private List<Qcm> testsQcm;
	
	@OneToMany(mappedBy = "professeur")
    private List<Devoir> devoirs;
	
	 @OneToMany(mappedBy = "professeur")
	 private List<Cours> cours;
}



