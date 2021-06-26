package services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.project.elearning.entities.User;
import com.project.elearning.repositories.UserRepository;

@Component
public class AuthUser{
	
	@Autowired
	private UserRepository userRepository;
	
	
	public User userInformations() {
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
		
		return user;
	}

}
