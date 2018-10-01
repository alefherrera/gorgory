package org.ungs.gorgory.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TestCase.
 */
@Entity
@Table(name = "test_case")
public class TestCase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "expected")
    private String expected;

    @OneToMany(mappedBy = "testCase")
    private Set<Argument> arguments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("testCases")
    private Exercise exercise;

    @OneToMany(mappedBy = "testCase")
    private Set<CaseResult> caseResults = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExpected() {
        return expected;
    }

    public TestCase expected(String expected) {
        this.expected = expected;
        return this;
    }

    public void setExpected(String expected) {
        this.expected = expected;
    }

    public Set<Argument> getArguments() {
        return arguments;
    }

    public TestCase arguments(Set<Argument> arguments) {
        this.arguments = arguments;
        return this;
    }

    public TestCase addArgument(Argument argument) {
        this.arguments.add(argument);
        argument.setTestCase(this);
        return this;
    }

    public TestCase removeArgument(Argument argument) {
        this.arguments.remove(argument);
        argument.setTestCase(null);
        return this;
    }

    public void setArguments(Set<Argument> arguments) {
        this.arguments = arguments;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public TestCase exercise(Exercise exercise) {
        this.exercise = exercise;
        return this;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Set<CaseResult> getCaseResults() {
        return caseResults;
    }

    public TestCase caseResults(Set<CaseResult> caseResults) {
        this.caseResults = caseResults;
        return this;
    }

    public TestCase addCaseResult(CaseResult caseResult) {
        this.caseResults.add(caseResult);
        caseResult.setTestCase(this);
        return this;
    }

    public TestCase removeCaseResult(CaseResult caseResult) {
        this.caseResults.remove(caseResult);
        caseResult.setTestCase(null);
        return this;
    }

    public void setCaseResults(Set<CaseResult> caseResults) {
        this.caseResults = caseResults;
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
        TestCase testCase = (TestCase) o;
        if (testCase.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testCase.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestCase{" +
            "id=" + getId() +
            ", expected='" + getExpected() + "'" +
            "}";
    }
}
