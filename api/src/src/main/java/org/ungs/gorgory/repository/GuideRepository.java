package org.ungs.gorgory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.ungs.gorgory.model.Guide;

import java.util.List;

@Repository
public interface GuideRepository extends JpaRepository<Guide, Long>, JpaSpecificationExecutor<Guide> {

    List<Guide> findAllByNameContaining(String name);

}

