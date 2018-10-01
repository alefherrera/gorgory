package org.ungs.gorgory.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.ungs.gorgory.domain.Argument;
import org.ungs.gorgory.repository.ArgumentRepository;
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
 * REST controller for managing Argument.
 */
@RestController
@RequestMapping("/api")
public class ArgumentResource {

    private final Logger log = LoggerFactory.getLogger(ArgumentResource.class);

    private static final String ENTITY_NAME = "argument";

    private final ArgumentRepository argumentRepository;

    public ArgumentResource(ArgumentRepository argumentRepository) {
        this.argumentRepository = argumentRepository;
    }

    /**
     * POST  /arguments : Create a new argument.
     *
     * @param argument the argument to create
     * @return the ResponseEntity with status 201 (Created) and with body the new argument, or with status 400 (Bad Request) if the argument has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/arguments")
    @Timed
    public ResponseEntity<Argument> createArgument(@RequestBody Argument argument) throws URISyntaxException {
        log.debug("REST request to save Argument : {}", argument);
        if (argument.getId() != null) {
            throw new BadRequestAlertException("A new argument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Argument result = argumentRepository.save(argument);
        return ResponseEntity.created(new URI("/api/arguments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /arguments : Updates an existing argument.
     *
     * @param argument the argument to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated argument,
     * or with status 400 (Bad Request) if the argument is not valid,
     * or with status 500 (Internal Server Error) if the argument couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/arguments")
    @Timed
    public ResponseEntity<Argument> updateArgument(@RequestBody Argument argument) throws URISyntaxException {
        log.debug("REST request to update Argument : {}", argument);
        if (argument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Argument result = argumentRepository.save(argument);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, argument.getId().toString()))
            .body(result);
    }

    /**
     * GET  /arguments : get all the arguments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of arguments in body
     */
    @GetMapping("/arguments")
    @Timed
    public List<Argument> getAllArguments() {
        log.debug("REST request to get all Arguments");
        return argumentRepository.findAll();
    }

    /**
     * GET  /arguments/:id : get the "id" argument.
     *
     * @param id the id of the argument to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the argument, or with status 404 (Not Found)
     */
    @GetMapping("/arguments/{id}")
    @Timed
    public ResponseEntity<Argument> getArgument(@PathVariable Long id) {
        log.debug("REST request to get Argument : {}", id);
        Optional<Argument> argument = argumentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(argument);
    }

    /**
     * DELETE  /arguments/:id : delete the "id" argument.
     *
     * @param id the id of the argument to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/arguments/{id}")
    @Timed
    public ResponseEntity<Void> deleteArgument(@PathVariable Long id) {
        log.debug("REST request to delete Argument : {}", id);

        argumentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
