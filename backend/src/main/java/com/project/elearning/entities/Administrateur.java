package com.project.elearning.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.sun.istack.NotNull;

@Entity
@Table(name = "directeur")
public class Administrateur {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_administrateur")
	private Long id;
	private String nom;
	private String prenom;
	private Character sexe;
	private String email;
	private String passwordDirecteur;
	private String image;
	private Boolean isSuper;
}
