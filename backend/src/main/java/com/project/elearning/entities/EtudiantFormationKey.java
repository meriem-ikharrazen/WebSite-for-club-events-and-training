package com.project.elearning.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class EtudiantFormationKey implements Serializable {

	@Column(name = "id")
    Long idEtudiant;

    @Column(name = "id_formation")
    Long idFormation;

	public EtudiantFormationKey(Long idEtudiant, Long idFormation) {
		super();
		this.idEtudiant = idEtudiant;
		this.idFormation = idFormation;
	}
	
	
	
	public EtudiantFormationKey() {
		super();
	}



//	@Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        EtudiantFormationKey efk = (EtudiantFormationKey) o;
//        return idEtudiant.equals(efk.idEtudiant) &&
//        		idFormation.equals(efk.idFormation);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(idEtudiant, idFormation);
//    }

	public Long getIdEtudiant() {
		return idEtudiant;
	}

	public void setIdEtudiant(Long idEtudiant) {
		this.idEtudiant = idEtudiant;
	}

	public Long getIdFormation() {
		return idFormation;
	}

	public void setIdFormation(Long idFormation) {
		this.idFormation = idFormation;
	}
    
    
    
    
}
