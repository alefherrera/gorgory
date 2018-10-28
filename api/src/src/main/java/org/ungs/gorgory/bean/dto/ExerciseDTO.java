package org.ungs.gorgory.bean.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.Language;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ExerciseDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("language")
    private Language language;

    @JsonProperty("description")
    private String description;

    @JsonProperty("testCases")
    private List<TestCaseDTO> testCases;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<TestCaseDTO> getTestCases() {
        return testCases;
    }

    public void setTestCases(List<TestCaseDTO> testCases) {
        this.testCases = testCases;
    }
}
