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

@Entity
@Table(name = "cours")
public class Cours {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cours")
	private Long id;
	private String libele;
	private String description;
	private String niveau;
	private String diplome;
	private Date dateAjout;
	private Date dateFin;
	
	@OneToMany(mappedBy = "cours")
    private List<Qcm> testsQcm;
	
	@ManyToOne
    @JoinColumn(name = "id_professeur")
    private Professeur professeur;
}
