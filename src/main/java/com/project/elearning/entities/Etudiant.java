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
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "etudiant")
public class Etudiant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_etudiant")
	private Long id;
	private String cne;
	private String nomEtudiant;
	private String prenomEtudiant;
	private Character sexeEtudiant;
	@Temporal(TemporalType.DATE)
	private Date dateNaissance;
	private String emailEtudiant;
	private String telEtudiant;
	private String passwordEtudiant;
	private String niveau;
	private String diplomePrepare;
	private String imageDirecteur;
	
	@OneToMany(mappedBy = "etudiant")
    private Set<EtudQcm> etudQcm;
	
	@ManyToOne
    @JoinColumn(name = "id_classe")
    private Classe classe;
	
	@OneToMany(mappedBy = "etudiant")
    private List<EtudDevoir> etudDevoir;
	
	@OneToMany(mappedBy = "etudiant")
    private List<Role> role;
}
