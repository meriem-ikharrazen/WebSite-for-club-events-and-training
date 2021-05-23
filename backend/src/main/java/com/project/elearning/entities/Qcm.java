package com.project.elearning.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "qcm")
public class Qcm {
	
	@EmbeddedId
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_qcm")
	private Long id;
	
	@OneToMany(mappedBy = "qcm")
    private List<Question> questions;
	
	@ManyToMany(mappedBy = "testsQcm")
    private List<Classe> classes;
	
	@ManyToOne
    @JoinColumn(name = "id_cours")
    private Cours cours;
	
	@OneToMany(mappedBy = "qcm")
    private List<EtudQcm> etudQcm;
	
	@ManyToOne
    @JoinColumn(name = "id_professeur")
    private Professeur professeur;
}
