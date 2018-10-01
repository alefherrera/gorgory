package org.ungs.gorgory.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Argument.
 */
@Entity
@Table(name = "argument")
public class Argument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_value")
    private String value;

    @ManyToOne
    @JsonIgnoreProperties("arguments")
    private TestCase testCase;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public Argument value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public TestCase getTestCase() {
        return testCase;
    }

    public Argument testCase(TestCase testCase) {
        this.testCase = testCase;
        return this;
    }

    public void setTestCase(TestCase testCase) {
        this.testCase = testCase;
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
        Argument argument = (Argument) o;
        if (argument.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), argument.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Argument{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
