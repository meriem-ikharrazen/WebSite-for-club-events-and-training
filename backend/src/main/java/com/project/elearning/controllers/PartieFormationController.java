package com.project.elearning.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.elearning.Exceptions.MyException;
import com.project.elearning.entities.Formation;
import com.project.elearning.entities.PartieFormation;
import com.project.elearning.repositories.FormateurRepository;
import com.project.elearning.repositories.PartieFormationRepository;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class PartieFormationController {
	
	@Autowired
	private FormateurRepository formateurRepository;
	
	@Autowired
    private PartieFormationRepository contentRepo;
	
	 @PostMapping("/contents")
	  List<PartieFormation> getAll(@RequestBody Formation formation) {
		 
	    return contentRepo.findByFormation(formation);
	  }
	 
	 @PostMapping("/contents/add")
	 PartieFormation add(@RequestBody PartieFormation content) {
		 
	    return contentRepo.save(content);
	  }
	 
	 @GetMapping("/contents/{id}")
	 PartieFormation findById(@PathVariable Long id) {
	    
	    return contentRepo.findById(id)
	      .orElseThrow(() -> new MyException("not found"));
	  }


	  @DeleteMapping("/contents/{id}")
	  void delete(@PathVariable Long id) {
	     contentRepo.deleteById(id);
	  }
	  
}
