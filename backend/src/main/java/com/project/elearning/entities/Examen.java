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
@Table(name = "examen")
public class Examen {
	
	@EmbeddedId
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_examen")
	private Long id;
	private String nom;
	
	@OneToMany(mappedBy = "examen")
    private List<Question> questions;
	
	@ManyToOne
    @JoinColumn(name = "id_examen")
    private Formation formation;
	
	
	@OneToMany(mappedBy = "examen")
    private List<EtudiantExamen> etudiantExamens;
	

}
