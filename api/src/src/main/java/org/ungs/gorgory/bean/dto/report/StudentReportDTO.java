package org.ungs.gorgory.bean.dto.report;

import org.ungs.gorgory.bean.dto.UserDTO;

import java.util.List;

public class StudentReportDTO {
    private UserDTO student;
    private List<ExerciseReportDTO> exerciseResults;

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
