package org.ungs.gorgory.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CaseResult.
 */
@Entity
@Table(name = "case_result")
public class CaseResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "passed")
    private Boolean passed;

    @ManyToOne
    @JsonIgnoreProperties("caseResults")
    private TestCase testCase;

    @ManyToOne
    @JsonIgnoreProperties("caseResults")
    private Resolution resolution;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isPassed() {
        return passed;
    }

    public CaseResult passed(Boolean passed) {
        this.passed = passed;
        return this;
    }

    public void setPassed(Boolean passed) {
        this.passed = passed;
    }

    public TestCase getTestCase() {
        return testCase;
    }

    public CaseResult testCase(TestCase testCase) {
        this.testCase = testCase;
        return this;
    }

    public void setTestCase(TestCase testCase) {
        this.testCase = testCase;
    }

    public Resolution getResolution() {
        return resolution;
    }

    public CaseResult resolution(Resolution resolution) {
        this.resolution = resolution;
        return this;
    }

    public void setResolution(Resolution resolution) {
        this.resolution = resolution;
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
        CaseResult caseResult = (CaseResult) o;
        if (caseResult.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), caseResult.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CaseResult{" +
            "id=" + getId() +
            ", passed='" + isPassed() + "'" +
            "}";
    }
}
