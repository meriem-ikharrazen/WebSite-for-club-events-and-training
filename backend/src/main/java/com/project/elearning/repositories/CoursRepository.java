package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Cours;

public interface CoursRepository extends JpaRepository<Cours, Long> {

}
