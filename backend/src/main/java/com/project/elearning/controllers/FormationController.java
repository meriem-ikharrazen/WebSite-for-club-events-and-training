package com.project.elearning.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.elearning.entities.Club;
import com.project.elearning.entities.Formation;
import com.project.elearning.repositories.ClubRepository;
import com.project.elearning.repositories.FormationRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class FormationController {
	@Autowired
	private FormationRepository formationRepository;
	
	@GetMapping("/formations")
	List<Formation> getAll() {
		return formationRepository.findAll();
	  }
}
