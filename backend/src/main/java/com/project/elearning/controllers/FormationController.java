package com.project.elearning.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.elearning.Exceptions.MyException;
import com.project.elearning.entities.Club;
import com.project.elearning.entities.Formateur;
import com.project.elearning.entities.Formation;
import com.project.elearning.repositories.ClubRepository;
import com.project.elearning.repositories.FormateurRepository;
import com.project.elearning.repositories.FormationRepository;

import payload.ResponseMsg;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class FormationController {
	@Autowired
	private FormationRepository formationRepository;
	
	@Autowired
	private FormateurRepository formateurRepository;
	
	@GetMapping("/formations")
	List<Formation> getAll() {
		return formationRepository.findAll();
	  }
	
	@GetMapping("/formations/formateur/{id}")
	List<Formation> getAll(@PathVariable Long id) {
		Formateur formateur = formateurRepository.findById(id).
			     orElseThrow(() -> new MyException("not found"));
		
		return formationRepository.findByFormateur(formateur);
	  }
	
	@GetMapping("/formations/{id}")
	Formation findById(@PathVariable Long id) {
	    
	    	return formationRepository.findById(id)
	      .orElseThrow(() -> new MyException("formation not found"));
	  }
	@PostMapping("/formations")
	 ResponseEntity<?> addFormation(@RequestBody Formation formation) {
		
		System.out.println(formation.getDate_debut());
		formationRepository.save(formation);
		return ResponseEntity.ok(new ResponseMsg(200,"Formation added successfully"));
	 }
	
	 @PostMapping("/formations/upload")
		public void uploadImage(@RequestParam("fileInput") MultipartFile file) throws IOException {
		  System.out.println("Original Image Byte Size - " + file);
		    File resourcesDirectory = new File("src/main/webapp/public/images/formations");

			byte[] bytes = file.getBytes();
			Path path = Paths.get(resourcesDirectory+"/"+ file.getOriginalFilename() );
			System.out.println("my path: "+path);
			Files.write(path, bytes);
		}
	 
	 @PutMapping("/formations")
	  Formation access(@RequestBody Formation formation) {
	     System.out.println("the id is: "+formation.getImage());
		 return formationRepository.save(formation);
	  }
	 
	 @DeleteMapping("/formations/{id}")
	  void delete(@PathVariable Long id) {
	     formationRepository.deleteById(id);
	  }
}

