package com.project.elearning.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.project.elearning.entities.EtudiantFormation;
import com.project.elearning.entities.Evenement;
import com.project.elearning.repositories.EtudiantFormationRepository;

import payload.ResponseMsg;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class EtudiantFormationController {
	
	@Autowired
	private EtudiantFormationRepository etudiantFormation;
	
	 @PostMapping("/EtudiantFormation/add")
	 ResponseEntity<?> addEtudiantFormation(@RequestBody EtudiantFormation ef) {
		 	
			 etudiantFormation.save(ef);
			 return ResponseEntity.ok(new ResponseMsg(200,"Etudiant Formation added successfully"));
	 }
	

	 @GetMapping("/EtudiantFormation/{idEtud}/{idForm}")
	  EtudiantFormation findById(@PathVariable Long idEtud,@PathVariable Long idForm) {
	    
	    return etudiantFormation.searchByIdEtudAndIdForm(idEtud,idForm);
	  }
	 

	  @DeleteMapping("/EtudiantFormation/{idEtud}/{idForm}")
	  void delete(@PathVariable Long idEtud,@PathVariable Long idForm) {
		  etudiantFormation.deleteByIdEtudAndIdForm(idEtud, idForm);
	  }

}
