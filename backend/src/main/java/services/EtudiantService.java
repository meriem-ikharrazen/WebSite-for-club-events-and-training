package services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.elearning.entities.Etudiant;
import com.project.elearning.repositories.EtudiantRepository;

@Service
public class EtudiantService {

	@Autowired
	private EtudiantRepository etudiantRepository;
	
	 @Transactional 
	 public List<Etudiant> getAll() {
		 
		    return etudiantRepository.findAll();
		  }
}
