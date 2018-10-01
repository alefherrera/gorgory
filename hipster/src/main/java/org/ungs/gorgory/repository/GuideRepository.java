package org.ungs.gorgory.repository;

import org.ungs.gorgory.domain.Guide;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Guide entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GuideRepository extends JpaRepository<Guide, Long> {

}
