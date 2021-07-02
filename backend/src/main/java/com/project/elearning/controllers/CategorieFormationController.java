package com.project.elearning.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.project.elearning.entities.CategorieFormation;
import com.project.elearning.repositories.CategorieFormationRepository;

import payload.ResponseMsg;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class CategorieFormationController {


	@Autowired
	private CategorieFormationRepository categorieRepository;
	
	 @GetMapping("/categories")
	  List<CategorieFormation> getAll() {
	    return categorieRepository.findAll();
	  }
	
		@PostMapping("/categories/add")
		 ResponseEntity<?> addCategorie(@RequestBody CategorieFormation cat) {
			 
			categorieRepository.save(cat);
			return ResponseEntity.ok(new ResponseMsg(200,"categoryadded successfully"));
		 }
	 
	 @GetMapping("/categories/{id}")
	  CategorieFormation findById(@PathVariable Long id) {
	    
	    return categorieRepository.findById(id)
	      .orElseThrow(() -> new MyException("User not found"));
	  }
	 
	  @PutMapping("/categories/{id}")
	  CategorieFormation update(@RequestBody CategorieFormation newCat, @PathVariable Long id) {
	    
	    return  categorieRepository.save(newCat);
	  }

	  @DeleteMapping("/categories/{id}")
	  void delete(@PathVariable Long id) {
		  categorieRepository.deleteById(id);
	  }
}
