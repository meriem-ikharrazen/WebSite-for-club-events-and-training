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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "classe")
public class Classe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_class")
	private Long id;
	private String nomClass;
	
	
	@ManyToMany
    @JoinTable(
            name = "classe_qcm",
            joinColumns = { @JoinColumn(name = "id_class") },
            inverseJoinColumns = { @JoinColumn(name = "id_qcm") })
    List<Qcm> testsQcm;
	
	@OneToMany(mappedBy = "classe")
    private List<Etudiant> etudiants;
	
}
