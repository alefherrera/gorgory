package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.bean.dto.UserDTO;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StudentReportDTO {

    @JsonProperty("student")
    private UserDTO student;

    @JsonProperty("exercise_results")
    private List<ExerciseReportDTO> exerciseResults;

    @JsonProperty("totals")
    private ReportTotalsDTO reportTotalsDTO;

    public UserDTO getStudent() {
        return student;
    }

    public void setStudent(UserDTO student) {
        this.student = student;
    }

    public List<ExerciseReportDTO> getExerciseResults() {
        return exerciseResults;
    }

    public void setExerciseResults(List<ExerciseReportDTO> exerciseResults) {
        this.exerciseResults = exerciseResults;
    }
}
