package org.ungs.gorgory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.ungs.gorgory.model.Signature;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Long>, JpaSpecificationExecutor<Signature> {

}
