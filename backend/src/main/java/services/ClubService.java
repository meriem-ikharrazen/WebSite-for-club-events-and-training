package services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.elearning.entities.Club;
import com.project.elearning.repositories.ClubRepository;

@Service
public class ClubService {

	@Autowired
	private ClubRepository clubRepository;
	
	 @Transactional 
	 public List<Club> getAll() {
		 
		    return clubRepository.findAll();
		  }
}
