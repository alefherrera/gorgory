package org.ungs.gorgory.bean;

import java.util.List;

public class CodeEvaluationPayload {

    private List<InputOutputPair> testCases;
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

    public class InputOutputPair {
        private List<String> inputParameters;
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


}
