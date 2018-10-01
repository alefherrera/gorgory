package org.ungs.gorgory.web.rest;

import org.ungs.gorgory.GorgoryApp;

import org.ungs.gorgory.domain.Argument;
import org.ungs.gorgory.repository.ArgumentRepository;
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
 * Test class for the ArgumentResource REST controller.
 *
 * @see ArgumentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GorgoryApp.class)
public class ArgumentResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private ArgumentRepository argumentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restArgumentMockMvc;

    private Argument argument;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArgumentResource argumentResource = new ArgumentResource(argumentRepository);
        this.restArgumentMockMvc = MockMvcBuilders.standaloneSetup(argumentResource)
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
    public static Argument createEntity(EntityManager em) {
        Argument argument = new Argument()
            .value(DEFAULT_VALUE);
        return argument;
    }

    @Before
    public void initTest() {
        argument = createEntity(em);
    }

    @Test
    @Transactional
    public void createArgument() throws Exception {
        int databaseSizeBeforeCreate = argumentRepository.findAll().size();

        // Create the Argument
        restArgumentMockMvc.perform(post("/api/arguments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(argument)))
            .andExpect(status().isCreated());

        // Validate the Argument in the database
        List<Argument> argumentList = argumentRepository.findAll();
        assertThat(argumentList).hasSize(databaseSizeBeforeCreate + 1);
        Argument testArgument = argumentList.get(argumentList.size() - 1);
        assertThat(testArgument.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createArgumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = argumentRepository.findAll().size();

        // Create the Argument with an existing ID
        argument.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArgumentMockMvc.perform(post("/api/arguments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(argument)))
            .andExpect(status().isBadRequest());

        // Validate the Argument in the database
        List<Argument> argumentList = argumentRepository.findAll();
        assertThat(argumentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllArguments() throws Exception {
        // Initialize the database
        argumentRepository.saveAndFlush(argument);

        // Get all the argumentList
        restArgumentMockMvc.perform(get("/api/arguments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(argument.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }
    
    @Test
    @Transactional
    public void getArgument() throws Exception {
        // Initialize the database
        argumentRepository.saveAndFlush(argument);

        // Get the argument
        restArgumentMockMvc.perform(get("/api/arguments/{id}", argument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(argument.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingArgument() throws Exception {
        // Get the argument
        restArgumentMockMvc.perform(get("/api/arguments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArgument() throws Exception {
        // Initialize the database
        argumentRepository.saveAndFlush(argument);

        int databaseSizeBeforeUpdate = argumentRepository.findAll().size();

        // Update the argument
        Argument updatedArgument = argumentRepository.findById(argument.getId()).get();
        // Disconnect from session so that the updates on updatedArgument are not directly saved in db
        em.detach(updatedArgument);
        updatedArgument
            .value(UPDATED_VALUE);

        restArgumentMockMvc.perform(put("/api/arguments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArgument)))
            .andExpect(status().isOk());

        // Validate the Argument in the database
        List<Argument> argumentList = argumentRepository.findAll();
        assertThat(argumentList).hasSize(databaseSizeBeforeUpdate);
        Argument testArgument = argumentList.get(argumentList.size() - 1);
        assertThat(testArgument.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingArgument() throws Exception {
        int databaseSizeBeforeUpdate = argumentRepository.findAll().size();

        // Create the Argument

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArgumentMockMvc.perform(put("/api/arguments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(argument)))
            .andExpect(status().isBadRequest());

        // Validate the Argument in the database
        List<Argument> argumentList = argumentRepository.findAll();
        assertThat(argumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArgument() throws Exception {
        // Initialize the database
        argumentRepository.saveAndFlush(argument);

        int databaseSizeBeforeDelete = argumentRepository.findAll().size();

        // Get the argument
        restArgumentMockMvc.perform(delete("/api/arguments/{id}", argument.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Argument> argumentList = argumentRepository.findAll();
        assertThat(argumentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Argument.class);
        Argument argument1 = new Argument();
        argument1.setId(1L);
        Argument argument2 = new Argument();
        argument2.setId(argument1.getId());
        assertThat(argument1).isEqualTo(argument2);
        argument2.setId(2L);
        assertThat(argument1).isNotEqualTo(argument2);
        argument1.setId(null);
        assertThat(argument1).isNotEqualTo(argument2);
    }
}
