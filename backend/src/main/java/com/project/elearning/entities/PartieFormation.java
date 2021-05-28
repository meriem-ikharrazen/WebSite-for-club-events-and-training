package com.project.elearning.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "partieFormation")
public class PartieFormation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_partie")
	private Long id;
	private String nom;
	private String description;
	private String url;
	
	@ManyToOne
    @JoinColumn(name = "id_formation")
    private Formation formation;
}
