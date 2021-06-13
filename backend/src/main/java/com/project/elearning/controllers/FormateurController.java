package com.project.elearning.controllers;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.elearning.Exceptions.MyException;
import com.project.elearning.entities.Formateur;
import com.project.elearning.repositories.FormateurRepository;
import com.project.elearning.repositories.RoleRepository;
import com.project.elearning.repositories.UserRepository;

import services.FormateurService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class FormateurController {
	
	@Autowired
	private FormateurRepository formateurRepository;
	
	@Autowired
    private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
//	@Lazy(false)
	 @GetMapping("/formateurs")
	  List<Formateur> getAll() {
		 
	    return formateurRepository.findAll();
	  }

	 
	 @GetMapping("/formateurs/{id}")
	  Formateur findById(@PathVariable Long id) {
	    
	    return formateurRepository.findById(id)
	      .orElseThrow(() -> new MyException("User not found"));
	  }
	 
	 @PostMapping("/searchFormateur")
	  List<Formateur> search(@RequestBody String searchTxt) {
		System.out.println(searchTxt);
	    return formateurRepository.searchByEmailNom(searchTxt);
	  }

	  @PutMapping("/formteurs/{id}")
	  Formateur update(@RequestBody Formateur newFormateur, @PathVariable Long id) {
	    
	    return formateurRepository.findById(id)
	      .map(formateur -> {
	    	  formateur.setNom(newFormateur.getNom());
	        return formateurRepository.save(newFormateur);
	      })
	      .orElseGet(() -> {
//	    	  newFormateur.setId(id);
	        return formateurRepository.save(newFormateur);
	      });
	  }

	  @DeleteMapping("/formateurs/{id}")
	  void delete(@PathVariable Long id) {
	     formateurRepository.deleteById(id);
	  }
	  
	  @PutMapping("/formateurAccess/{id}")
	  Formateur access(@PathVariable Long id) {
	     Formateur formateur = formateurRepository.findById(id)
	    		 .orElseThrow(() -> new MyException("User not found"));
	     
	     formateur.setAccess(!formateur.getAccess());
	     return formateurRepository.save(formateur);
	  }
	

}
