package org.ungs.gorgory.bean.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.enums.ResultState;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ResultDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("testCase")
    private TestCaseDTO testCase;

    @JsonProperty("state")
    private ResultState state;

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

    public ResultState getPassed() {
        return state;
    }

    public void setPassed(ResultState passed) {
        this.state = passed;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }
}
