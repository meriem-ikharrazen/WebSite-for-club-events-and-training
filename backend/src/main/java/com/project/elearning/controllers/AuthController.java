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

import com.project.elearning.entities.Administrateur;
import com.project.elearning.entities.Etudiant;
import com.project.elearning.entities.Formateur;
import com.project.elearning.entities.Role;
import com.project.elearning.repositories.UserRepository;

import payload.JwtResponse;
import payload.LoginRequest;
import payload.ResponseMsg;
import services.UserDetailsImpl;

import com.project.elearning.repositories.AdministrateurRepository;
import com.project.elearning.repositories.EtudiantRepository;
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
	
	@Autowired
	private EtudiantRepository etudiantRepository;
	
	@Autowired
	private AdministrateurRepository adminRepository;

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
			 String image = (formateur.getSexe() =='m')?"public/images/male.jpg" : "public/images/female.jpg";
			 formateur.setImage(image);
			 formateurRepository.save(formateur);
			 return ResponseEntity.ok(new ResponseMsg(200,"Formateur added successfully"));
		  }
	 }
	
	@PostMapping("/signup/student")
	 ResponseEntity<?> registerStudent(@RequestBody Etudiant etudiant) {
		 
		 boolean isEtudiantExist = etudiantRepository.existsByCne(etudiant.getCne());
		 if(isEtudiantExist) {
//			 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use");
			 return ResponseEntity.ok(new ResponseMsg(403,"This student already in the database."));
		 }else{
			 etudiant.setPassword(passwordEncoder.encode(etudiant.getPassword()));
				Set<Role> roles = new HashSet<>();
				roles.add(roleRepository.findRoleByName("etudiant"));
				etudiant.setRoles(roles);
				etudiantRepository.save(etudiant);
			 return ResponseEntity.ok(new ResponseMsg(200,"Student added successfully"));
		  }
	 }
	
	@PostMapping("/signup/admin")
	 ResponseEntity<?> registerAdmin(@RequestBody Administrateur admin) {
		 
		 boolean isFormateurExist = adminRepository.existsByEmail(admin.getEmail());
		 if(isFormateurExist) {
			 return ResponseEntity.ok(new ResponseMsg(403,"Email already in use."));
		 }else{
			 admin.setPassword(passwordEncoder.encode(admin.getPassword()));
				Set<Role> roles = new HashSet<>();
				roles.add(roleRepository.findRoleByName("admin"));
			 admin.setRoles(roles);
			 String image = (admin.getSexe() =='m')?"public/images/male.jpg" : "public/images/female.jpg";
			 admin.setImage(image);
			 adminRepository.save(admin);
			 return ResponseEntity.ok(new ResponseMsg(200,"Admin added successfully"));
		  }
	 }
	 
}