package org.ungs.gorgory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.ungs.gorgory.domain.enumeration.Language;

/**
 * A Exercise.
 */
@Entity
@Table(name = "exercise")
public class Exercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @OneToMany(mappedBy = "exercise")
    private Set<TestCase> testCases = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("exercises")
    private Guide guide;

    @OneToMany(mappedBy = "exercise")
    private Set<Resolution> resolutions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Language getLanguage() {
        return language;
    }

    public Exercise language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Set<TestCase> getTestCases() {
        return testCases;
    }

    public Exercise testCases(Set<TestCase> testCases) {
        this.testCases = testCases;
        return this;
    }

    public Exercise addTestCase(TestCase testCase) {
        this.testCases.add(testCase);
        testCase.setExercise(this);
        return this;
    }

    public Exercise removeTestCase(TestCase testCase) {
        this.testCases.remove(testCase);
        testCase.setExercise(null);
        return this;
    }

    public void setTestCases(Set<TestCase> testCases) {
        this.testCases = testCases;
    }

    public Guide getGuide() {
        return guide;
    }

    public Exercise guide(Guide guide) {
        this.guide = guide;
        return this;
    }

    public void setGuide(Guide guide) {
        this.guide = guide;
    }

    public Set<Resolution> getResolutions() {
        return resolutions;
    }

    public Exercise resolutions(Set<Resolution> resolutions) {
        this.resolutions = resolutions;
        return this;
    }

    public Exercise addResolution(Resolution resolution) {
        this.resolutions.add(resolution);
        resolution.setExercise(this);
        return this;
    }

    public Exercise removeResolution(Resolution resolution) {
        this.resolutions.remove(resolution);
        resolution.setExercise(null);
        return this;
    }

    public void setResolutions(Set<Resolution> resolutions) {
        this.resolutions = resolutions;
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
        Exercise exercise = (Exercise) o;
        if (exercise.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), exercise.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Exercise{" +
            "id=" + getId() +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
