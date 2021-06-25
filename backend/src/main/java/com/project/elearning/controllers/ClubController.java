package com.project.elearning.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import org.springframework.web.bind.annotation.RestController;

import com.project.elearning.Exceptions.MyException;
import com.project.elearning.entities.Club;
import com.project.elearning.entities.Etudiant;
import com.project.elearning.entities.Role;
import com.project.elearning.repositories.ClubRepository;

import payload.ResponseMsg;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class ClubController {
	
	@Autowired
	private ClubRepository clubRepository;
	
	//@Lazy(false)
	 @GetMapping("/clubs")
	  List<Club> getAll() {
		 
	    return clubRepository.findAll();
	  }
	
		@PostMapping("/clubs/add")
		 ResponseEntity<?> addClub(@RequestBody Club club) {
			 
			 boolean isClubExist = clubRepository.existsByDesignation(club.getDesignation());
			 if(isClubExist) {
//				 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use");
				 return ResponseEntity.ok(new ResponseMsg(403,"This club already in the database."));
			 }else{
					clubRepository.save(club);
				 return ResponseEntity.ok(new ResponseMsg(200,"Club added successfully"));
			  }
		 }
	 
	 @GetMapping("/clubs/{id}")
	  Club findById(@PathVariable Long id) {
	    
	    return clubRepository.findById(id)
	      .orElseThrow(() -> new MyException("User not found"));
	  }
	 
	 @PostMapping("/searchclub")
	  List<Club> search(@RequestBody String searchTxt) {
		System.out.println(searchTxt);
	    return clubRepository.searchByNom(searchTxt);
	  }

	  @PutMapping("/clubs/{id}")
	  Club update(@RequestBody Club newClub, @PathVariable Long id) {
	    
	    return clubRepository.findById(id)
	      .map(club-> {
	    	  club.setDesignation(newClub.getDesignation());
	        return clubRepository.save(newClub);
	      })
	      .orElseGet(() -> {
//	    	  newFormateur.setId(id);
	        return clubRepository.save(newClub);
	      });
	  }

	  @DeleteMapping("/clubs/{id}")
	  void delete(@PathVariable Long id) {
	     clubRepository.deleteById(id);
	  }
	  
}
