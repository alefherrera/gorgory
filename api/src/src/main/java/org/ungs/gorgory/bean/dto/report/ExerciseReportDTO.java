package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.bean.dto.ExerciseDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ExerciseReportDTO {

    @JsonProperty("exercise")
    private ExerciseDTO exercise;

    @JsonProperty("result")
    private ReportResultDTO result;

    public ReportResultDTO getResult() {
        return result;
    }

    public void setResult(ReportResultDTO result) {
        this.result = result;
    }

    public ExerciseDTO getExercise() {
        return exercise;
    }

    public void setExercise(ExerciseDTO exercise) {
        this.exercise = exercise;
    }
}
