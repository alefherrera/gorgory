package org.ungs.gorgory.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity
public class Result implements Serializable {

    @Id
    @ManyToOne
    private Resolution resolution;

    @Id
    @ManyToOne
    private TestCase testCase;

    private Boolean passed;

    public Resolution getResolution() {
        return resolution;
    }

    public void setResolution(Resolution resolution) {
        this.resolution = resolution;
    }

    public TestCase getTestCase() {
        return testCase;
    }

    public void setTestCase(TestCase testCase) {
        this.testCase = testCase;
    }

    public Boolean getPassed() {
        return passed;
    }

    public void setPassed(Boolean passed) {
        this.passed = passed;
    }
}
