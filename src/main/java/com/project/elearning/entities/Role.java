package com.project.elearning.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;


@Entity
@Table(name = "role")
public class Role {
	
	@EmbeddedId
    EtudiantClubKey key;

	@ManyToOne
	@MapsId("idEtudiant")
    @JoinColumn(name = "id_etudiant")
	private Etudiant etudiant;
	
	@ManyToOne
	@MapsId("idClub")
    @JoinColumn(name = "id_club")
    private Club club;

	private String libele;
	
	
}
