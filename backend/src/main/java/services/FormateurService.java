package services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.elearning.entities.Formateur;
import com.project.elearning.repositories.FormateurRepository;

@Service
public class FormateurService {
	@Autowired
	private FormateurRepository formateurRepository;
	
	 @Transactional 
	 public List<Formateur> getAll() {
		 
		    return formateurRepository.findAll();
		  }
	 
}
