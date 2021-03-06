package com.project.elearning.request;

import javax.validation.constraints.NotBlank;

import lombok.Data;

public class LoginForm {

	 @NotBlank
	 private String email;
	 
	 @NotBlank
	 private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	 
	 
}
