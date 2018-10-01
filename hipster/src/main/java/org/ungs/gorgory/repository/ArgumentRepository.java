package org.ungs.gorgory.repository;

import org.ungs.gorgory.domain.Argument;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Argument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArgumentRepository extends JpaRepository<Argument, Long> {

}
