package com.project.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.elearning.entities.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
