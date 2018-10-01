package org.ungs.gorgory.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.ungs.gorgory.domain.Resolution;
import org.ungs.gorgory.service.ResolutionService;
import org.ungs.gorgory.web.rest.errors.BadRequestAlertException;
import org.ungs.gorgory.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Resolution.
 */
@RestController
@RequestMapping("/api")
public class ResolutionResource {

    private final Logger log = LoggerFactory.getLogger(ResolutionResource.class);

    private static final String ENTITY_NAME = "resolution";

    private final ResolutionService resolutionService;

    public ResolutionResource(ResolutionService resolutionService) {
        this.resolutionService = resolutionService;
    }

    /**
     * POST  /resolutions : Create a new resolution.
     *
     * @param resolution the resolution to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resolution, or with status 400 (Bad Request) if the resolution has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/resolutions")
    @Timed
    public ResponseEntity<Resolution> createResolution(@RequestBody Resolution resolution) throws URISyntaxException {
        log.debug("REST request to save Resolution : {}", resolution);
        if (resolution.getId() != null) {
            throw new BadRequestAlertException("A new resolution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Resolution result = resolutionService.save(resolution);
        return ResponseEntity.created(new URI("/api/resolutions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /resolutions : Updates an existing resolution.
     *
     * @param resolution the resolution to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resolution,
     * or with status 400 (Bad Request) if the resolution is not valid,
     * or with status 500 (Internal Server Error) if the resolution couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/resolutions")
    @Timed
    public ResponseEntity<Resolution> updateResolution(@RequestBody Resolution resolution) throws URISyntaxException {
        log.debug("REST request to update Resolution : {}", resolution);
        if (resolution.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Resolution result = resolutionService.save(resolution);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resolution.getId().toString()))
            .body(result);
    }

    /**
     * GET  /resolutions : get all the resolutions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of resolutions in body
     */
    @GetMapping("/resolutions")
    @Timed
    public List<Resolution> getAllResolutions() {
        log.debug("REST request to get all Resolutions");
        return resolutionService.findAll();
    }

    /**
     * GET  /resolutions/:id : get the "id" resolution.
     *
     * @param id the id of the resolution to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resolution, or with status 404 (Not Found)
     */
    @GetMapping("/resolutions/{id}")
    @Timed
    public ResponseEntity<Resolution> getResolution(@PathVariable Long id) {
        log.debug("REST request to get Resolution : {}", id);
        Optional<Resolution> resolution = resolutionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(resolution);
    }

    /**
     * DELETE  /resolutions/:id : delete the "id" resolution.
     *
     * @param id the id of the resolution to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/resolutions/{id}")
    @Timed
    public ResponseEntity<Void> deleteResolution(@PathVariable Long id) {
        log.debug("REST request to delete Resolution : {}", id);
        resolutionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
