package org.ungs.gorgory.web.rest;

import org.ungs.gorgory.GorgoryApp;

import org.ungs.gorgory.domain.Guide;
import org.ungs.gorgory.repository.GuideRepository;
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
 * Test class for the GuideResource REST controller.
 *
 * @see GuideResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GorgoryApp.class)
public class GuideResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGuideMockMvc;

    private Guide guide;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GuideResource guideResource = new GuideResource(guideRepository);
        this.restGuideMockMvc = MockMvcBuilders.standaloneSetup(guideResource)
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
    public static Guide createEntity(EntityManager em) {
        Guide guide = new Guide()
            .name(DEFAULT_NAME);
        return guide;
    }

    @Before
    public void initTest() {
        guide = createEntity(em);
    }

    @Test
    @Transactional
    public void createGuide() throws Exception {
        int databaseSizeBeforeCreate = guideRepository.findAll().size();

        // Create the Guide
        restGuideMockMvc.perform(post("/api/guides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(guide)))
            .andExpect(status().isCreated());

        // Validate the Guide in the database
        List<Guide> guideList = guideRepository.findAll();
        assertThat(guideList).hasSize(databaseSizeBeforeCreate + 1);
        Guide testGuide = guideList.get(guideList.size() - 1);
        assertThat(testGuide.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGuideWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = guideRepository.findAll().size();

        // Create the Guide with an existing ID
        guide.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGuideMockMvc.perform(post("/api/guides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(guide)))
            .andExpect(status().isBadRequest());

        // Validate the Guide in the database
        List<Guide> guideList = guideRepository.findAll();
        assertThat(guideList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = guideRepository.findAll().size();
        // set the field null
        guide.setName(null);

        // Create the Guide, which fails.

        restGuideMockMvc.perform(post("/api/guides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(guide)))
            .andExpect(status().isBadRequest());

        List<Guide> guideList = guideRepository.findAll();
        assertThat(guideList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGuides() throws Exception {
        // Initialize the database
        guideRepository.saveAndFlush(guide);

        // Get all the guideList
        restGuideMockMvc.perform(get("/api/guides?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(guide.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getGuide() throws Exception {
        // Initialize the database
        guideRepository.saveAndFlush(guide);

        // Get the guide
        restGuideMockMvc.perform(get("/api/guides/{id}", guide.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(guide.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGuide() throws Exception {
        // Get the guide
        restGuideMockMvc.perform(get("/api/guides/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGuide() throws Exception {
        // Initialize the database
        guideRepository.saveAndFlush(guide);

        int databaseSizeBeforeUpdate = guideRepository.findAll().size();

        // Update the guide
        Guide updatedGuide = guideRepository.findById(guide.getId()).get();
        // Disconnect from session so that the updates on updatedGuide are not directly saved in db
        em.detach(updatedGuide);
        updatedGuide
            .name(UPDATED_NAME);

        restGuideMockMvc.perform(put("/api/guides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGuide)))
            .andExpect(status().isOk());

        // Validate the Guide in the database
        List<Guide> guideList = guideRepository.findAll();
        assertThat(guideList).hasSize(databaseSizeBeforeUpdate);
        Guide testGuide = guideList.get(guideList.size() - 1);
        assertThat(testGuide.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGuide() throws Exception {
        int databaseSizeBeforeUpdate = guideRepository.findAll().size();

        // Create the Guide

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGuideMockMvc.perform(put("/api/guides")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(guide)))
            .andExpect(status().isBadRequest());

        // Validate the Guide in the database
        List<Guide> guideList = guideRepository.findAll();
        assertThat(guideList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGuide() throws Exception {
        // Initialize the database
        guideRepository.saveAndFlush(guide);

        int databaseSizeBeforeDelete = guideRepository.findAll().size();

        // Get the guide
        restGuideMockMvc.perform(delete("/api/guides/{id}", guide.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Guide> guideList = guideRepository.findAll();
        assertThat(guideList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Guide.class);
        Guide guide1 = new Guide();
        guide1.setId(1L);
        Guide guide2 = new Guide();
        guide2.setId(guide1.getId());
        assertThat(guide1).isEqualTo(guide2);
        guide2.setId(2L);
        assertThat(guide1).isNotEqualTo(guide2);
        guide1.setId(null);
        assertThat(guide1).isNotEqualTo(guide2);
    }
}
