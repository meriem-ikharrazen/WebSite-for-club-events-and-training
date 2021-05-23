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
public class Directeur {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_directeur")
	private Long id;
	private String nomDirecteur;
	private String prenomDirecteur;
	private Character sexeDirecteur;
	@Temporal(TemporalType.DATE)
	private Date dateNaissance;
	private String emailDirecteur;
	private String telDirecteur;
	private String passwordDirecteur;
	private String imageDirecteur;

}
