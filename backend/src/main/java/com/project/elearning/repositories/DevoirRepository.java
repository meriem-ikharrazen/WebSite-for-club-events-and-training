package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Devoir;

public interface DevoirRepository extends JpaRepository<Devoir, Long> {

}
