package com.project.elearning.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.elearning.entities.Formateur;
import com.project.elearning.entities.Role;
import com.project.elearning.repositories.UserRepository;

import payload.JwtResponse;
import payload.LoginRequest;
import payload.ResponseMsg;
import services.UserDetailsImpl;

import com.project.elearning.repositories.FormateurRepository;
import com.project.elearning.repositories.RoleRepository;
import security.JwtUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
	private FormateurRepository formateurRepository;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getNom(),
												 userDetails.getPrenom(),
												 userDetails.getEmail(), 
												 roles));
	}

	@PostMapping("/signup/formateur")
	 ResponseEntity<?> registerFormateur(@RequestBody Formateur formateur) {
		 
		 boolean isFormateurExist = formateurRepository.existsByEmail(formateur.getEmail());
		 if(isFormateurExist) {
//			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use");
			 return ResponseEntity.ok(new ResponseMsg(403,"Email already in use."));
		 }else{
			 formateur.setPassword(passwordEncoder.encode(formateur.getPassword()));
				Set<Role> roles = new HashSet<>();
				roles.add(roleRepository.findRoleByName("formateur"));
			 formateur.setRoles(roles);
			 return ResponseEntity.ok(new ResponseMsg(200,formateurRepository.save(formateur)));
		  }
	 }
	 
}