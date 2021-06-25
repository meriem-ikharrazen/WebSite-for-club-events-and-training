package com.project.elearning.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.elearning.Exceptions.MyException;
import com.project.elearning.entities.Administrateur;
import com.project.elearning.repositories.AdministrateurRepository;
import com.project.elearning.repositories.RoleRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class AdminController {
	
	@Autowired
	private AdministrateurRepository adminRepository;
	
	@Autowired
    private RoleRepository roleRepository;
	
	 @GetMapping("/admins")
	  List<Administrateur> getAll() {
		 
	    return adminRepository.findAll();
	  }

	 @GetMapping("/admins/{id}")
	  Administrateur findById(@PathVariable Long id) {
	    
	    return adminRepository.findById(id)
	      .orElseThrow(() -> new MyException("User not found"));
	  }
	 

	  @PutMapping("/admins/{id}")
	 	Administrateur update(@RequestBody Administrateur newAdministrateur, @PathVariable Long id) {
	    
	    return adminRepository.findById(id)
	      .map(Administrateur -> {
	    	  Administrateur.setNom(newAdministrateur.getNom());
	    	  Administrateur.setPrenom(newAdministrateur.getPrenom());
	        return adminRepository.save(Administrateur) ;
	      })
	      .orElseGet(() -> {
	        return null;
	      });
	  }

	  @DeleteMapping("/admins/{id}")
	  void delete(@PathVariable Long id) {
	     adminRepository.deleteById(id);
	  }
	  
	  @PutMapping("/adminStatus/{id}")
	  Administrateur access(@PathVariable Long id) {
	     Administrateur administrateur = adminRepository.findById(id)
	    		 .orElseThrow(() -> new MyException("User not found"));
	     
	     administrateur.setIsSuper(!administrateur.getIsSuper());
	     return adminRepository.save(administrateur);
	  }
	

}
