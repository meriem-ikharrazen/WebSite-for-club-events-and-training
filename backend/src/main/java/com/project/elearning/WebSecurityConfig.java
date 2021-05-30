package com.project.elearning;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
   
			@Override
			protected void configure(HttpSecurity http) throws Exception {
				http.cors();
			    http.csrf().disable().authorizeRequests()
			            .antMatchers("/api/**").permitAll()
			            .anyRequest().authenticated(); 
			         }
			
   @Bean
   PasswordEncoder getEncoder() {
       return new BCryptPasswordEncoder();
   }
}