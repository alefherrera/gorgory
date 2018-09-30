package org.ungs.gorgory.bean;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class InputOutputPair {
    @JsonProperty("inputParameters")
    private List<String> inputParameters;

    @JsonProperty("expectedOutput")
    private String expectedOutput;

    public List<String> getInputParameters() {
        return inputParameters;
    }

    public void setInputParameters(List<String> inputParameters) {
        this.inputParameters = inputParameters;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }
}