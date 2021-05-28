package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Organisation;

public interface OrganisationRepository extends JpaRepository<Organisation, Long> {

}
