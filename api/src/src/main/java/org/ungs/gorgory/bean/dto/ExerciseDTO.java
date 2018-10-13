package org.ungs.gorgory.bean.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.Language;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ExerciseDTO {

    @JsonProperty("language")
    private Language language;

    @JsonProperty("testCases")
    private List<TestCaseDTO> testCases;

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public List<TestCaseDTO> getTestCases() {
        return testCases;
    }

    public void setTestCases(List<TestCaseDTO> testCases) {
        this.testCases = testCases;
    }
}
