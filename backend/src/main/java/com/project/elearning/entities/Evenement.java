package com.project.elearning.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "evenement")
public class Evenement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evenement")
	private Long id;
	private String libele;
	private String description;
	private String image;
	private Date dateAjout;
	private Date dateFin;
	private Boolean status;
	
	@ManyToOne
    @JoinColumn(name = "id_club")
    private Club club;
}
