package com.project.elearning;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import security.AuthEntryPointJwt;
import security.AuthTokenFilter;
import security.JwtUtils;
import services.AuthUser;
import services.FormateurService;
import services.UserDetailsServiceImpl;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
//Now we can secure methods in our Apis with @PreAuthorize annotation easily.
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
   
	@Autowired
	UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;
	
	@Bean
	public FormateurService fs() {
		return new FormateurService();
	}

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}
	
	@Bean
	public AuthEntryPointJwt authEntryPointJwt() {
		return new AuthEntryPointJwt();
	}
	
	@Bean
	public JwtUtils jwtUtils() {
		return new JwtUtils();
	}
	
	@Bean
	public UserDetailsServiceImpl userDetailsServiceImpl() {
		return new UserDetailsServiceImpl();
	}

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthUser authUSER() {
		return new AuthUser();
	}
	
	
	@Override
			protected void configure(HttpSecurity http) throws Exception {
		
		http.cors().and().csrf().disable()
		.formLogin()
        .loginPage("/login")
        .usernameParameter("email")
        .and()
		.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
		.authorizeRequests()
		.antMatchers("/api/auth/**").permitAll()
		.antMatchers("/api/**").permitAll()
		.antMatchers("/home/**").permitAll()
		.antMatchers("/resources/**").permitAll()
		.antMatchers("/public/**").permitAll()

		.anyRequest().authenticated();

	http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	
//				http.cors();
//			    http.csrf().disable().authorizeRequests()
//			            .antMatchers("/api/**","/home").permitAll()
//			            .anyRequest().authenticated()
//			            .and()
//			            .formLogin()
//		                .usernameParameter("email")
//		                .defaultSuccessUrl("/")
//		                .permitAll();
				
//				http.authorizeRequests()
//				.antMatchers("/register").permitAll()
//	            .antMatchers("/home").authenticated()
//	            .anyRequest().permitAll()
//	            .and()
//	            .formLogin()
//	                .usernameParameter("email")
//	                .defaultSuccessUrl("/")
//	                .permitAll()
//	            .and()
//	            .logout().logoutSuccessUrl("/").permitAll();
			         }
  
   
 
}