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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "formateur")
public class Formateur extends User {
	@Temporal(TemporalType.DATE)
	private Date date_naissance;
	private String tel;
	private String diplome;
	private String profession;
	private String specialite;
	private Boolean access = false;
	
	@ManyToOne
    @JoinColumn(name = "id_organisation")
    private Organisation organisation;
	
	
	@OneToMany(mappedBy = "formateur")
	@JsonIgnore
	private List<Formation> formations;


	

	public Date getDate_naissance() {
		return date_naissance;
	}


	public void setDate_naissance(Date date_naissance) {
		this.date_naissance = date_naissance;
	}


	public String getTel() {
		return tel;
	}


	public void setTel(String tel) {
		this.tel = tel;
	}


	public String getDiplome() {
		return diplome;
	}


	public void setDiplome(String diplome) {
		this.diplome = diplome;
	}


	public String getSpecialite() {
		return specialite;
	}


	public void setSpecialite(String specialite) {
		this.specialite = specialite;
	}


	public Boolean getAccess() {
		return access;
	}


	public void setAccess(Boolean access) {
		this.access = access;
	}

	public Organisation getOrganisation() {
		return organisation;
	}


	public void setOrganisation(Organisation organisation) {
		this.organisation = organisation;
	}


	public List<Formation> getFormations() {
		return formations;
	}


	public void setFormations(List<Formation> formations) {
		this.formations = formations;
	}


	public String getProfession() {
		return profession;
	}


	public void setProfession(String profession) {
		this.profession = profession;
	}
	
	
	
	
	
}



