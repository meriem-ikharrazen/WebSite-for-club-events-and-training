package com.project.elearning.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "club")
public class Club {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_club")
	private Long id;
	private String libele;
	private String description;
	
	@OneToMany(mappedBy = "club")
    private List<Club> club;
	
	@OneToMany(mappedBy = "club")
    private List<Evenement> evenements;
	
}
