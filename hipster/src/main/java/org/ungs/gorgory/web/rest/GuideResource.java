package org.ungs.gorgory.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.springframework.security.access.annotation.Secured;
import org.ungs.gorgory.domain.Guide;
import org.ungs.gorgory.repository.GuideRepository;
import org.ungs.gorgory.security.AuthoritiesConstants;
import org.ungs.gorgory.web.rest.errors.BadRequestAlertException;
import org.ungs.gorgory.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Guide.
 */
@RestController
@RequestMapping("/api")
public class GuideResource {

    private final Logger log = LoggerFactory.getLogger(GuideResource.class);

    private static final String ENTITY_NAME = "guide";

    private final GuideRepository guideRepository;

    public GuideResource(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
    }

    /**
     * POST  /guides : Create a new guide.
     *
     * @param guide the guide to create
     * @return the ResponseEntity with status 201 (Created) and with body the new guide, or with status 400 (Bad Request) if the guide has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/guides")
    @Timed
    public ResponseEntity<Guide> createGuide(@Valid @RequestBody Guide guide) throws URISyntaxException {
        log.debug("REST request to save Guide : {}", guide);
        if (guide.getId() != null) {
            throw new BadRequestAlertException("A new guide cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Guide result = guideRepository.save(guide);
        return ResponseEntity.created(new URI("/api/guides/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /guides : Updates an existing guide.
     *
     * @param guide the guide to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated guide,
     * or with status 400 (Bad Request) if the guide is not valid,
     * or with status 500 (Internal Server Error) if the guide couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/guides")
    @Timed
    public ResponseEntity<Guide> updateGuide(@Valid @RequestBody Guide guide) throws URISyntaxException {
        log.debug("REST request to update Guide : {}", guide);
        if (guide.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Guide result = guideRepository.save(guide);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, guide.getId().toString()))
            .body(result);
    }

    /**
     * GET  /guides : get all the guides.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of guides in body
     */
    @GetMapping("/guides")
    @Timed
    public List<Guide> getAllGuides() {
        log.debug("REST request to get all Guides");
        return guideRepository.findAll();
    }

    /**
     * GET  /guides/:id : get the "id" guide.
     *
     * @param id the id of the guide to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the guide, or with status 404 (Not Found)
     */
    @GetMapping("/guides/{id}")
    @Timed
    public ResponseEntity<Guide> getGuide(@PathVariable Long id) {
        log.debug("REST request to get Guide : {}", id);
        Optional<Guide> guide = guideRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(guide);
    }

    /**
     * DELETE  /guides/:id : delete the "id" guide.
     *
     * @param id the id of the guide to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/guides/{id}")
    @Timed
    public ResponseEntity<Void> deleteGuide(@PathVariable Long id) {
        log.debug("REST request to delete Guide : {}", id);

        guideRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
