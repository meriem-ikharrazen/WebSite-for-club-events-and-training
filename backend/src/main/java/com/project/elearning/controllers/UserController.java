package com.project.elearning.controllers;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.Deflater;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.elearning.entities.Administrateur;
import com.project.elearning.entities.User;
import com.project.elearning.repositories.UserRepository;

import payload.JwtResponse;
import payload.LoginRequest;
import payload.ResponseMsg;
import services.AuthUser;
import services.UserDetailsImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	@Autowired
	private AuthUser authUser;
	
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
		 
		 
		/* @PostMapping(value = "/changePassword")
		 public ResponseEntity<?> changePassword(@RequestParam("current_password")String current_password,
				 @RequestParam("new_password")String new_password) {
			 
			 Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			 User user = userRepository.findByEmail(((UserDetailsImpl) principal).getEmail());
			 
			 return ResponseEntity.ok(new ResponseMsg(200,"Formateur added successfully"));

			}
*/
		 
		 //@RequestMapping(value = "/changePassword", method = RequestMethod.POST)
		 @PostMapping("/changePassword")
			public ResponseEntity<?> changePassword(@RequestBody ChangePassword body) throws IOException {
			
			System.out.println(body.getCurrent_password());
			System.out.println(body.getNew_password());
			
			User user = authUser.userInformations();
			if(bcrypt.matches(body.getCurrent_password(), user.getPassword())) {
				user.setPassword(bcrypt.encode(body.getNew_password()));
				try {
					userRepository.save(user);
					return ResponseEntity.ok(new ResponseMsg(200,"Password changed successfully."));
				}catch(Exception e) {
					return ResponseEntity.ok(new ResponseMsg(500,"Error occured: failed change password, try again."));

				}
			}else {
				return ResponseEntity.ok(new ResponseMsg(500,"Your current password is incorrect."));
			}
			

			}
		

}

class ChangePassword{
	private String current_password;
	private String new_password;
	public String getCurrent_password() {
		return current_password;
	}
	public void setCurrent_password(String current_password) {
		this.current_password = current_password;
	}
	public String getNew_password() {
		return new_password;
	}
	public void setNew_password(String new_password) {
		this.new_password = new_password;
	}
	
}
