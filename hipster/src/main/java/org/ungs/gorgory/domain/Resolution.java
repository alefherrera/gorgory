package org.ungs.gorgory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Resolution.
 */
@Entity
@Table(name = "resolution")
public class Resolution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "path")
    private String path;

    @OneToMany(mappedBy = "resolution")
    private Set<CaseResult> caseResults = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private User student;

    @ManyToOne
    @JsonIgnoreProperties("resolutions")
    private Exercise exercise;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public Resolution path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Set<CaseResult> getCaseResults() {
        return caseResults;
    }

    public Resolution caseResults(Set<CaseResult> caseResults) {
        this.caseResults = caseResults;
        return this;
    }

    public Resolution addCaseResult(CaseResult caseResult) {
        this.caseResults.add(caseResult);
        caseResult.setResolution(this);
        return this;
    }

    public Resolution removeCaseResult(CaseResult caseResult) {
        this.caseResults.remove(caseResult);
        caseResult.setResolution(null);
        return this;
    }

    public void setCaseResults(Set<CaseResult> caseResults) {
        this.caseResults = caseResults;
    }

    public User getStudent() {
        return student;
    }

    public Resolution student(User user) {
        this.student = user;
        return this;
    }

    public void setStudent(User user) {
        this.student = user;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public Resolution exercise(Exercise exercise) {
        this.exercise = exercise;
        return this;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Resolution resolution = (Resolution) o;
        if (resolution.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), resolution.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Resolution{" +
            "id=" + getId() +
            ", path='" + getPath() + "'" +
            "}";
    }
}
