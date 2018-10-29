package org.ungs.gorgory.bean.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ResultDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("testCase")
    private TestCaseDTO testCase;

    @JsonProperty("passed")
    private Boolean passed;

    @JsonProperty("output")
    private String output;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TestCaseDTO getTestCase() {
        return testCase;
    }

    public void setTestCase(TestCaseDTO testCase) {
        this.testCase = testCase;
    }

    public Boolean getPassed() {
        return passed;
    }

    public void setPassed(Boolean passed) {
        this.passed = passed;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }
}
