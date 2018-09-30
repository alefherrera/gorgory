package org.ungs.gorgory.bean;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CodeEvaluationPayload {

    @JsonProperty("testCases")
    private List<InputOutputPair> testCases;
    @JsonProperty("codeRegex")
    private String codeRegex;

    public List<InputOutputPair> getTestCases() {
        return testCases;
    }

    public void setTestCases(List<InputOutputPair> testCases) {
        this.testCases = testCases;
    }

    public String getCodeRegex() {
        return codeRegex;
    }

    public void setCodeRegex(String codeRegex) {
        this.codeRegex = codeRegex;
    }




}
