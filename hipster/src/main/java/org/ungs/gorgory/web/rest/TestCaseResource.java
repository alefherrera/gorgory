package org.ungs.gorgory.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.ungs.gorgory.domain.TestCase;
import org.ungs.gorgory.repository.TestCaseRepository;
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
 * REST controller for managing TestCase.
 */
@RestController
@RequestMapping("/api")
public class TestCaseResource {

    private final Logger log = LoggerFactory.getLogger(TestCaseResource.class);

    private static final String ENTITY_NAME = "testCase";

    private final TestCaseRepository testCaseRepository;

    public TestCaseResource(TestCaseRepository testCaseRepository) {
        this.testCaseRepository = testCaseRepository;
    }

    /**
     * POST  /test-cases : Create a new testCase.
     *
     * @param testCase the testCase to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testCase, or with status 400 (Bad Request) if the testCase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-cases")
    @Timed
    public ResponseEntity<TestCase> createTestCase(@RequestBody TestCase testCase) throws URISyntaxException {
        log.debug("REST request to save TestCase : {}", testCase);
        if (testCase.getId() != null) {
            throw new BadRequestAlertException("A new testCase cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestCase result = testCaseRepository.save(testCase);
        return ResponseEntity.created(new URI("/api/test-cases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-cases : Updates an existing testCase.
     *
     * @param testCase the testCase to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testCase,
     * or with status 400 (Bad Request) if the testCase is not valid,
     * or with status 500 (Internal Server Error) if the testCase couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-cases")
    @Timed
    public ResponseEntity<TestCase> updateTestCase(@RequestBody TestCase testCase) throws URISyntaxException {
        log.debug("REST request to update TestCase : {}", testCase);
        if (testCase.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestCase result = testCaseRepository.save(testCase);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testCase.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-cases : get all the testCases.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testCases in body
     */
    @GetMapping("/test-cases")
    @Timed
    public List<TestCase> getAllTestCases() {
        log.debug("REST request to get all TestCases");
        return testCaseRepository.findAll();
    }

    /**
     * GET  /test-cases/:id : get the "id" testCase.
     *
     * @param id the id of the testCase to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testCase, or with status 404 (Not Found)
     */
    @GetMapping("/test-cases/{id}")
    @Timed
    public ResponseEntity<TestCase> getTestCase(@PathVariable Long id) {
        log.debug("REST request to get TestCase : {}", id);
        Optional<TestCase> testCase = testCaseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(testCase);
    }

    /**
     * DELETE  /test-cases/:id : delete the "id" testCase.
     *
     * @param id the id of the testCase to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-cases/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestCase(@PathVariable Long id) {
        log.debug("REST request to delete TestCase : {}", id);

        testCaseRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
