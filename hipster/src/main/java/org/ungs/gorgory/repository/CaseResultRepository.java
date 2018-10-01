package org.ungs.gorgory.repository;

import org.ungs.gorgory.domain.CaseResult;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CaseResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CaseResultRepository extends JpaRepository<CaseResult, Long> {

}
