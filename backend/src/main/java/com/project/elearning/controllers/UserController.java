package com.project.elearning.controllers;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.zip.Deflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.elearning.entities.Administrateur;
import com.project.elearning.entities.User;
import com.project.elearning.repositories.UserRepository;

import services.UserDetailsImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
		 @PostMapping("/changeImage")
		public User changeImage(@RequestParam("file") MultipartFile file) throws IOException {
			System.out.println("Original Image Byte Size - " + file);
		    File resourcesDirectory = new File("src/main/webapp/public/images");

			byte[] bytes = file.getBytes();
		    //System.out.println(resourcesDirectory.getAbsolutePath());

			Path path = Paths.get(resourcesDirectory+"/"+ file.getOriginalFilename() );
			System.out.println("my path: "+path);
			//Path path = Paths.get(this.getClass().getResource("/").getPath());
			//System.out.println("--------------------------------------------");
		    //System.out.println(path.toAbsolutePath());
			Files.write(path, bytes);
			Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String email = "";
			if (principal instanceof UserDetailsImpl) {
				  email = ((UserDetailsImpl)principal).getEmail();
				  System.out.println("first: "+email);
				} else {
					email = principal.toString();
				  System.out.println("second: "+email);

				}
			User user = userRepository.findByEmail(email);
			if(user != null) {
				user.setImage("public/images/"+file.getOriginalFilename());
				userRepository.save(user);
			}
			return user;
		}
		 
		

}
