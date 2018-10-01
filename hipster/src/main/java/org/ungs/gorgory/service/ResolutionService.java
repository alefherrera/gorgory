package org.ungs.gorgory.service;

import org.ungs.gorgory.domain.Resolution;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Resolution.
 */
public interface ResolutionService {

    /**
     * Save a resolution.
     *
     * @param resolution the entity to save
     * @return the persisted entity
     */
    Resolution save(Resolution resolution);

    /**
     * Get all the resolutions.
     *
     * @return the list of entities
     */
    List<Resolution> findAll();


    /**
     * Get the "id" resolution.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Resolution> findOne(Long id);

    /**
     * Delete the "id" resolution.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
