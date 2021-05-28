package com.project.elearning.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "club")
public class Club {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_club")
	private Long id;
	private String designation;
	private String description;
	private String logo;
	
	@OneToMany(mappedBy = "club")
    private List<Formation> formations;
	
	@OneToMany(mappedBy = "club")
    private List<Evenement> evenements;
	
	@OneToOne
    @JoinColumn(name = "id_etudiant")
    private Etudiant etudiant;
}
