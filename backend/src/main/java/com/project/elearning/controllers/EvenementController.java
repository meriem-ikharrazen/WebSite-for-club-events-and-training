package com.project.elearning.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.elearning.Exceptions.MyException;
import com.project.elearning.entities.Evenement;
import com.project.elearning.repositories.EvenementRepository;

import payload.ResponseMsg;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class EvenementController {

	@Autowired
	private EvenementRepository evenementRepository;
	
	@GetMapping("/evenements")
	  List<Evenement> getAll() {
		 
	    return evenementRepository.findAll();
	  }
	
	@PostMapping("/evenements/add")
	 ResponseEntity<?> addEvenement(@RequestBody Evenement evenement) {
		 
		 boolean isEvenementExist = evenementRepository.existsByLibele(evenement.getLibele());
		 if(isEvenementExist) {
//			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use");
			 return ResponseEntity.ok(new ResponseMsg(403,"This event already in the database."));
		 }else{
				evenementRepository.save(evenement);
			 return ResponseEntity.ok(new ResponseMsg(200,"Event added successfully"));
		  }
	 }

	@GetMapping("/evenements/{id}")
	 Evenement findById(@PathVariable Long id) {
	   return evenementRepository.findById(id)
	     .orElseThrow(() -> new MyException("Event not found"));
	 }
	
	@PostMapping("/searchevent")
	 List<Evenement> search(@RequestBody String searchTxt) {
		System.out.println(searchTxt);
	   return evenementRepository.searchByLibele(searchTxt);
	 }
	
	 @PutMapping("/evenements/{id}")
	 Evenement update(@RequestBody Evenement newEvenement, @PathVariable Long id) {
	   
	   return evenementRepository.findById(id)
	     .map(evenement-> {
	    	 evenement.setLibele(newEvenement.getLibele());
	       return evenementRepository.save(newEvenement);
	     })
	     .orElseGet(() -> {
	//   	  newFormateur.setId(id);
	       return evenementRepository.save(newEvenement);
	     });
	 }
	
	 @DeleteMapping("/evenements/{id}")
	 void delete(@PathVariable Long id) {
	    evenementRepository.deleteById(id);
	 }
	 
	 
	 @PostMapping("/evenements/upload")
		public void uploadImage(@RequestParam("fileInput") MultipartFile file) throws IOException {
		  System.out.println("Original Image Byte Size - " + file);
		    File resourcesDirectory = new File("src/main/webapp/public/images/evenements");
	
			byte[] bytes = file.getBytes();
		    //System.out.println(resourcesDirectory.getAbsolutePath());
	
			Path path = Paths.get(resourcesDirectory+"/"+ file.getOriginalFilename() );
			System.out.println("my path: "+path);
			//Path path = Paths.get(this.getClass().getResource("/").getPath());
			//System.out.println("--------------------------------------------");
		    //System.out.println(path.toAbsolutePath());
			Files.write(path, bytes);
		}
		
}
