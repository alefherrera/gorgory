package org.ungs.gorgory.service.impl;

import org.ungs.gorgory.service.ResolutionService;
import org.ungs.gorgory.domain.Resolution;
import org.ungs.gorgory.repository.ResolutionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Resolution.
 */
@Service
@Transactional
public class ResolutionServiceImpl implements ResolutionService {

    private final Logger log = LoggerFactory.getLogger(ResolutionServiceImpl.class);

    private final ResolutionRepository resolutionRepository;

    public ResolutionServiceImpl(ResolutionRepository resolutionRepository) {
        this.resolutionRepository = resolutionRepository;
    }

    /**
     * Save a resolution.
     *
     * @param resolution the entity to save
     * @return the persisted entity
     */
    @Override
    public Resolution save(Resolution resolution) {
        log.debug("Request to save Resolution : {}", resolution);

        return resolutionRepository.save(resolution);
    }

    /**
     * Get all the resolutions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Resolution> findAll() {
        log.debug("Request to get all Resolutions");
        return resolutionRepository.findAll();
    }


    /**
     * Get one resolution by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Resolution> findOne(Long id) {
        log.debug("Request to get Resolution : {}", id);
        return resolutionRepository.findById(id);
    }

    /**
     * Delete the resolution by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Resolution : {}", id);
        resolutionRepository.deleteById(id);
    }
}
