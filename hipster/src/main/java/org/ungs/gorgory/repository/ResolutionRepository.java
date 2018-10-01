package org.ungs.gorgory.repository;

import org.ungs.gorgory.domain.Resolution;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Resolution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResolutionRepository extends JpaRepository<Resolution, Long> {

    @Query("select resolution from Resolution resolution where resolution.student.login = ?#{principal.username}")
    List<Resolution> findByStudentIsCurrentUser();

}
