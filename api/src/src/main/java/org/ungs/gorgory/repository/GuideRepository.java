package org.ungs.gorgory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.ungs.gorgory.model.Course;
import org.ungs.gorgory.model.Guide;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Repository
public interface GuideRepository extends JpaRepository<Guide, Long>, JpaSpecificationExecutor<Guide> {

    List<Guide> findAllByNameContaining(String name);

    List<Guide> findAllByStartBeforeAndEndAfterAndCoursesIn(LocalDateTime dateTime, LocalDateTime dateTime2, Set<Course> courses);

}

