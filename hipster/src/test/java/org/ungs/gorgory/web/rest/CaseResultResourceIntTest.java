package org.ungs.gorgory.web.rest;

import org.ungs.gorgory.GorgoryApp;

import org.ungs.gorgory.domain.CaseResult;
import org.ungs.gorgory.repository.CaseResultRepository;
import org.ungs.gorgory.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static org.ungs.gorgory.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CaseResultResource REST controller.
 *
 * @see CaseResultResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GorgoryApp.class)
public class CaseResultResourceIntTest {

    private static final Boolean DEFAULT_PASSED = false;
    private static final Boolean UPDATED_PASSED = true;

    @Autowired
    private CaseResultRepository caseResultRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCaseResultMockMvc;

    private CaseResult caseResult;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CaseResultResource caseResultResource = new CaseResultResource(caseResultRepository);
        this.restCaseResultMockMvc = MockMvcBuilders.standaloneSetup(caseResultResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CaseResult createEntity(EntityManager em) {
        CaseResult caseResult = new CaseResult()
            .passed(DEFAULT_PASSED);
        return caseResult;
    }

    @Before
    public void initTest() {
        caseResult = createEntity(em);
    }

    @Test
    @Transactional
    public void createCaseResult() throws Exception {
        int databaseSizeBeforeCreate = caseResultRepository.findAll().size();

        // Create the CaseResult
        restCaseResultMockMvc.perform(post("/api/case-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caseResult)))
            .andExpect(status().isCreated());

        // Validate the CaseResult in the database
        List<CaseResult> caseResultList = caseResultRepository.findAll();
        assertThat(caseResultList).hasSize(databaseSizeBeforeCreate + 1);
        CaseResult testCaseResult = caseResultList.get(caseResultList.size() - 1);
        assertThat(testCaseResult.isPassed()).isEqualTo(DEFAULT_PASSED);
    }

    @Test
    @Transactional
    public void createCaseResultWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = caseResultRepository.findAll().size();

        // Create the CaseResult with an existing ID
        caseResult.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCaseResultMockMvc.perform(post("/api/case-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caseResult)))
            .andExpect(status().isBadRequest());

        // Validate the CaseResult in the database
        List<CaseResult> caseResultList = caseResultRepository.findAll();
        assertThat(caseResultList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCaseResults() throws Exception {
        // Initialize the database
        caseResultRepository.saveAndFlush(caseResult);

        // Get all the caseResultList
        restCaseResultMockMvc.perform(get("/api/case-results?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caseResult.getId().intValue())))
            .andExpect(jsonPath("$.[*].passed").value(hasItem(DEFAULT_PASSED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCaseResult() throws Exception {
        // Initialize the database
        caseResultRepository.saveAndFlush(caseResult);

        // Get the caseResult
        restCaseResultMockMvc.perform(get("/api/case-results/{id}", caseResult.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(caseResult.getId().intValue()))
            .andExpect(jsonPath("$.passed").value(DEFAULT_PASSED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCaseResult() throws Exception {
        // Get the caseResult
        restCaseResultMockMvc.perform(get("/api/case-results/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCaseResult() throws Exception {
        // Initialize the database
        caseResultRepository.saveAndFlush(caseResult);

        int databaseSizeBeforeUpdate = caseResultRepository.findAll().size();

        // Update the caseResult
        CaseResult updatedCaseResult = caseResultRepository.findById(caseResult.getId()).get();
        // Disconnect from session so that the updates on updatedCaseResult are not directly saved in db
        em.detach(updatedCaseResult);
        updatedCaseResult
            .passed(UPDATED_PASSED);

        restCaseResultMockMvc.perform(put("/api/case-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCaseResult)))
            .andExpect(status().isOk());

        // Validate the CaseResult in the database
        List<CaseResult> caseResultList = caseResultRepository.findAll();
        assertThat(caseResultList).hasSize(databaseSizeBeforeUpdate);
        CaseResult testCaseResult = caseResultList.get(caseResultList.size() - 1);
        assertThat(testCaseResult.isPassed()).isEqualTo(UPDATED_PASSED);
    }

    @Test
    @Transactional
    public void updateNonExistingCaseResult() throws Exception {
        int databaseSizeBeforeUpdate = caseResultRepository.findAll().size();

        // Create the CaseResult

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCaseResultMockMvc.perform(put("/api/case-results")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caseResult)))
            .andExpect(status().isBadRequest());

        // Validate the CaseResult in the database
        List<CaseResult> caseResultList = caseResultRepository.findAll();
        assertThat(caseResultList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCaseResult() throws Exception {
        // Initialize the database
        caseResultRepository.saveAndFlush(caseResult);

        int databaseSizeBeforeDelete = caseResultRepository.findAll().size();

        // Get the caseResult
        restCaseResultMockMvc.perform(delete("/api/case-results/{id}", caseResult.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CaseResult> caseResultList = caseResultRepository.findAll();
        assertThat(caseResultList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CaseResult.class);
        CaseResult caseResult1 = new CaseResult();
        caseResult1.setId(1L);
        CaseResult caseResult2 = new CaseResult();
        caseResult2.setId(caseResult1.getId());
        assertThat(caseResult1).isEqualTo(caseResult2);
        caseResult2.setId(2L);
        assertThat(caseResult1).isNotEqualTo(caseResult2);
        caseResult1.setId(null);
        assertThat(caseResult1).isNotEqualTo(caseResult2);
    }
}
