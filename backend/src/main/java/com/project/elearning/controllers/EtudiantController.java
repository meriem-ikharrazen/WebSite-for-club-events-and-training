package com.project.elearning.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.project.elearning.entities.Etudiant;
import com.project.elearning.repositories.EtudiantRepository;
import com.project.elearning.repositories.RoleRepository;
import com.project.elearning.repositories.UserRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class EtudiantController {

	@Autowired
	private EtudiantRepository etudiantRepository;
	
	@Autowired
    private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
//	@Lazy(false)
	 @GetMapping("/students")
	  List<Etudiant> getAll() {
		 
	    return etudiantRepository.findAll();
	  }

	 
	 @GetMapping("/students/{id}")
	  Etudiant findById(@PathVariable Long id) {
	    
	    return etudiantRepository.findById(id)
	      .orElseThrow(() -> new MyException("User not found"));
	  }
	 
	 @PostMapping("/searchstudent")
	  List<Etudiant> search(@RequestBody String searchTxt) {
		System.out.println(searchTxt);
	    return etudiantRepository.searchByCne(searchTxt);
	  }

	  @PutMapping("/students/{id}")
	  Etudiant update(@RequestBody Etudiant newEtudiant, @PathVariable Long id) {
	    
	    return etudiantRepository.findById(id)
	      .map(etudiant -> {
	    	  etudiant.setNom(newEtudiant.getNom());
	        return etudiantRepository.save(newEtudiant);
	      })
	      .orElseGet(() -> {
//	    	  newFormateur.setId(id);
	        return etudiantRepository.save(newEtudiant);
	      });
	  }

	  @DeleteMapping("/students/{id}")
	  void delete(@PathVariable Long id) {
	     etudiantRepository.deleteById(id);
	  }
	  
	
}
