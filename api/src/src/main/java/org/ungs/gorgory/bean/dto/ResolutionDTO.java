package org.ungs.gorgory.bean.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.model.Exercise;
import org.ungs.gorgory.model.User;

import java.util.Collection;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ResolutionDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("exercise")
    private ExerciseDTO exercise;

    @JsonProperty("student")
    private UserDTO student;

    @JsonProperty("path")
    private String path;

    @JsonProperty("results")
    private Collection<ResultDTO> results;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ExerciseDTO getExercise() {
        return exercise;
    }

    public void setExercise(ExerciseDTO exercise) {
        this.exercise = exercise;
    }

    public UserDTO getStudent() {
        return student;
    }

    public void setStudent(UserDTO student) {
        this.student = student;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Collection<ResultDTO> getResults() {
        return results;
    }

    public void setResults(Collection<ResultDTO> results) {
        this.results = results;
    }
}
