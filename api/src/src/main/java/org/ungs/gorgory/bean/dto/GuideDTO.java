package org.ungs.gorgory.bean.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.ungs.gorgory.Language;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

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

    @JsonProperty("createDateTime")
    private Date createDateTime;

    @JsonProperty("updateDateTime")
    private Date updateDateTime;

    @JsonProperty("start")
    private LocalDateTime start;

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

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }

    public Date getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(Date updateDateTime) {
        this.updateDateTime = updateDateTime;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }
}
