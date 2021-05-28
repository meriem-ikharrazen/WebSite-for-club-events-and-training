package com.project.elearning.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "organisation")
public class Organisation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_organisation")
	private Long id;
	private String designation;
	private String ville;
	private String siteWeb;
	private String image;
	@OneToMany(mappedBy = "organisation")
    private List<Formateur> formateurs;
}
