package org.ungs.gorgory.bean.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.Language;

import java.util.Collection;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GuideDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("language")
    private Language language;

    @JsonProperty("exercises")
    private Collection<ExerciseDTO> exercises;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Collection<ExerciseDTO> getExercises() {
        return exercises;
    }

    public void setExercises(Collection<ExerciseDTO> exercises) {
        this.exercises = exercises;
    }
}
