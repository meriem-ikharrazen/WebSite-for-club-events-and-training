package com.project.elearning.entities;

import java.util.Date;
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
@Table(name = "devoir")
public class Devoir {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_devoir")
	private Long id;
	private String libele;
	private String description;
	private String niveau;
	private String diplome;
	private String url;
	private Date dateAjout;
	private Date dateFin;
	private Boolean status;
	
	
	@OneToMany(mappedBy = "devoir")
    private List<EtudDevoir> etudDevoir;
	
	@ManyToOne
    @JoinColumn(name = "id_professeur")
    private Professeur professeur;
}
