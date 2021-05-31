package com.project.elearning.controllers;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.elearning.Exceptions.NotFound;
import com.project.elearning.entities.Formateur;
import com.project.elearning.entities.Role;
import com.project.elearning.entities.User;
import com.project.elearning.repositories.FormateurRepository;
import com.project.elearning.repositories.RoleRepository;
import com.project.elearning.repositories.UserRepository;

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
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	 @GetMapping("/formateurs")
	  List<Formateur> getAll() {
	    return formateurRepository.findAll();
	  }

	 
	 @PostMapping("/formateur")
	 Formateur add(@RequestBody Formateur formateur) {
		 
		 boolean isFormateurExist = formateurRepository.existsByEmail(formateur.getEmail());
		 if(isFormateurExist) {
			 return null;
			 
		 }else{
			 formateur.setPassword(passwordEncoder.encode(formateur.getPassword()));
				Set<Role> roles = new HashSet<>();
				roles.add(roleRepository.findRoleByName("formateur"));
			 formateur.setRoles(roles);
			    return formateurRepository.save(formateur); 
		  }
	 }
	 
	 @GetMapping("/formateurs/{id}")
	  Formateur findById(@PathVariable Long id) {
	    
	    return formateurRepository.findById(id)
	      .orElseThrow(() -> new NotFound());
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
	

}
