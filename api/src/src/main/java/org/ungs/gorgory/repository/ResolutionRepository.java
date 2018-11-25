package org.ungs.gorgory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.ungs.gorgory.model.Exercise;
import org.ungs.gorgory.model.Resolution;
import org.ungs.gorgory.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResolutionRepository extends JpaRepository<Resolution, Long>, JpaSpecificationExecutor<Resolution> {

    Optional<Resolution> findFirstByExerciseAndStudentOrderByCreateDateTimeDesc(Exercise exercise, User student);

    List<Resolution> findAllByExerciseAndStudentOrderByCreateDateTimeDesc(Exercise exercise, User student);

}
