package org.ungs.gorgory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.ungs.gorgory.model.Resolution;

@Repository
public interface ResolutionRepository extends JpaRepository<Resolution, Long>, JpaSpecificationExecutor<Resolution> {
}
