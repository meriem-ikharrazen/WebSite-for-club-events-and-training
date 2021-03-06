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
@Table(name = "question")
public class Question {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_question")
	private Long id;
	private String designation;
	private float note;
	
	@OneToMany(mappedBy = "question")
    private List<Choix> choix;
	
	@ManyToOne
    @JoinColumn(name = "id_examen")
    private Examen examen;
}
