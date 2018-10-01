package org.ungs.gorgory.web.rest;

import org.ungs.gorgory.GorgoryApp;

import org.ungs.gorgory.domain.Resolution;
import org.ungs.gorgory.repository.ResolutionRepository;
import org.ungs.gorgory.service.ResolutionService;
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
 * Test class for the ResolutionResource REST controller.
 *
 * @see ResolutionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GorgoryApp.class)
public class ResolutionResourceIntTest {

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    @Autowired
    private ResolutionRepository resolutionRepository;
    
    @Autowired
    private ResolutionService resolutionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restResolutionMockMvc;

    private Resolution resolution;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ResolutionResource resolutionResource = new ResolutionResource(resolutionService);
        this.restResolutionMockMvc = MockMvcBuilders.standaloneSetup(resolutionResource)
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
    public static Resolution createEntity(EntityManager em) {
        Resolution resolution = new Resolution()
            .path(DEFAULT_PATH);
        return resolution;
    }

    @Before
    public void initTest() {
        resolution = createEntity(em);
    }

    @Test
    @Transactional
    public void createResolution() throws Exception {
        int databaseSizeBeforeCreate = resolutionRepository.findAll().size();

        // Create the Resolution
        restResolutionMockMvc.perform(post("/api/resolutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resolution)))
            .andExpect(status().isCreated());

        // Validate the Resolution in the database
        List<Resolution> resolutionList = resolutionRepository.findAll();
        assertThat(resolutionList).hasSize(databaseSizeBeforeCreate + 1);
        Resolution testResolution = resolutionList.get(resolutionList.size() - 1);
        assertThat(testResolution.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void createResolutionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = resolutionRepository.findAll().size();

        // Create the Resolution with an existing ID
        resolution.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResolutionMockMvc.perform(post("/api/resolutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resolution)))
            .andExpect(status().isBadRequest());

        // Validate the Resolution in the database
        List<Resolution> resolutionList = resolutionRepository.findAll();
        assertThat(resolutionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllResolutions() throws Exception {
        // Initialize the database
        resolutionRepository.saveAndFlush(resolution);

        // Get all the resolutionList
        restResolutionMockMvc.perform(get("/api/resolutions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resolution.getId().intValue())))
            .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())));
    }
    
    @Test
    @Transactional
    public void getResolution() throws Exception {
        // Initialize the database
        resolutionRepository.saveAndFlush(resolution);

        // Get the resolution
        restResolutionMockMvc.perform(get("/api/resolutions/{id}", resolution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(resolution.getId().intValue()))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingResolution() throws Exception {
        // Get the resolution
        restResolutionMockMvc.perform(get("/api/resolutions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResolution() throws Exception {
        // Initialize the database
        resolutionService.save(resolution);

        int databaseSizeBeforeUpdate = resolutionRepository.findAll().size();

        // Update the resolution
        Resolution updatedResolution = resolutionRepository.findById(resolution.getId()).get();
        // Disconnect from session so that the updates on updatedResolution are not directly saved in db
        em.detach(updatedResolution);
        updatedResolution
            .path(UPDATED_PATH);

        restResolutionMockMvc.perform(put("/api/resolutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedResolution)))
            .andExpect(status().isOk());

        // Validate the Resolution in the database
        List<Resolution> resolutionList = resolutionRepository.findAll();
        assertThat(resolutionList).hasSize(databaseSizeBeforeUpdate);
        Resolution testResolution = resolutionList.get(resolutionList.size() - 1);
        assertThat(testResolution.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingResolution() throws Exception {
        int databaseSizeBeforeUpdate = resolutionRepository.findAll().size();

        // Create the Resolution

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResolutionMockMvc.perform(put("/api/resolutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resolution)))
            .andExpect(status().isBadRequest());

        // Validate the Resolution in the database
        List<Resolution> resolutionList = resolutionRepository.findAll();
        assertThat(resolutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteResolution() throws Exception {
        // Initialize the database
        resolutionService.save(resolution);

        int databaseSizeBeforeDelete = resolutionRepository.findAll().size();

        // Get the resolution
        restResolutionMockMvc.perform(delete("/api/resolutions/{id}", resolution.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Resolution> resolutionList = resolutionRepository.findAll();
        assertThat(resolutionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Resolution.class);
        Resolution resolution1 = new Resolution();
        resolution1.setId(1L);
        Resolution resolution2 = new Resolution();
        resolution2.setId(resolution1.getId());
        assertThat(resolution1).isEqualTo(resolution2);
        resolution2.setId(2L);
        assertThat(resolution1).isNotEqualTo(resolution2);
        resolution1.setId(null);
        assertThat(resolution1).isNotEqualTo(resolution2);
    }
}
