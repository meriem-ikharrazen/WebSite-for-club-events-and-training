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
@Table(name = "categorieFormation")
public class CategorieFormation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categorie")
	private Long id;
	private String designation;
	
	@OneToMany(mappedBy = "categorie")
    private List<Formation> formations;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public List<Formation> getFormations() {
		return formations;
	}

	public void setFormations(List<Formation> formations) {
		this.formations = formations;
	}
	
	
}
