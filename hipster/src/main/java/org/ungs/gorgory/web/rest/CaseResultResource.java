package org.ungs.gorgory.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.ungs.gorgory.domain.CaseResult;
import org.ungs.gorgory.repository.CaseResultRepository;
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
 * REST controller for managing CaseResult.
 */
@RestController
@RequestMapping("/api")
public class CaseResultResource {

    private final Logger log = LoggerFactory.getLogger(CaseResultResource.class);

    private static final String ENTITY_NAME = "caseResult";

    private final CaseResultRepository caseResultRepository;

    public CaseResultResource(CaseResultRepository caseResultRepository) {
        this.caseResultRepository = caseResultRepository;
    }

    /**
     * POST  /case-results : Create a new caseResult.
     *
     * @param caseResult the caseResult to create
     * @return the ResponseEntity with status 201 (Created) and with body the new caseResult, or with status 400 (Bad Request) if the caseResult has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/case-results")
    @Timed
    public ResponseEntity<CaseResult> createCaseResult(@RequestBody CaseResult caseResult) throws URISyntaxException {
        log.debug("REST request to save CaseResult : {}", caseResult);
        if (caseResult.getId() != null) {
            throw new BadRequestAlertException("A new caseResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CaseResult result = caseResultRepository.save(caseResult);
        return ResponseEntity.created(new URI("/api/case-results/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /case-results : Updates an existing caseResult.
     *
     * @param caseResult the caseResult to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated caseResult,
     * or with status 400 (Bad Request) if the caseResult is not valid,
     * or with status 500 (Internal Server Error) if the caseResult couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/case-results")
    @Timed
    public ResponseEntity<CaseResult> updateCaseResult(@RequestBody CaseResult caseResult) throws URISyntaxException {
        log.debug("REST request to update CaseResult : {}", caseResult);
        if (caseResult.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CaseResult result = caseResultRepository.save(caseResult);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, caseResult.getId().toString()))
            .body(result);
    }

    /**
     * GET  /case-results : get all the caseResults.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of caseResults in body
     */
    @GetMapping("/case-results")
    @Timed
    public List<CaseResult> getAllCaseResults() {
        log.debug("REST request to get all CaseResults");
        return caseResultRepository.findAll();
    }

    /**
     * GET  /case-results/:id : get the "id" caseResult.
     *
     * @param id the id of the caseResult to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the caseResult, or with status 404 (Not Found)
     */
    @GetMapping("/case-results/{id}")
    @Timed
    public ResponseEntity<CaseResult> getCaseResult(@PathVariable Long id) {
        log.debug("REST request to get CaseResult : {}", id);
        Optional<CaseResult> caseResult = caseResultRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(caseResult);
    }

    /**
     * DELETE  /case-results/:id : delete the "id" caseResult.
     *
     * @param id the id of the caseResult to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/case-results/{id}")
    @Timed
    public ResponseEntity<Void> deleteCaseResult(@PathVariable Long id) {
        log.debug("REST request to delete CaseResult : {}", id);

        caseResultRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
