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
    private Exercise exercise;

    @JsonProperty("student")
    private User student;

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

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
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
