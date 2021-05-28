package com.project.elearning.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class EtudiantExamenKey implements Serializable {

	@Column(name = "id_etudiant")
    Long idEtudiant;

    @Column(name = "id_examen")
    Long idExamen;

}
