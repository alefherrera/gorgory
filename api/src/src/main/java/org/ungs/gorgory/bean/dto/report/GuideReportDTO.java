package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.bean.dto.ExerciseDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GuideReportDTO {

    @JsonProperty("name")
    private String name;

    @JsonProperty("courses")
    private List<CourseReportDTO> courses;

    @JsonProperty("exerciseTotals")
    private List<ExerciseTotalsDTO> exerciseTotals = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCourses(List<CourseReportDTO> courses) {
        this.courses = courses;
    }

    public List<CourseReportDTO> getCourses() {
        return courses;
    }

    public void increaseExerciseUnknown(ExerciseDTO exerciseDTO) {
        ExerciseTotalsDTO parameter = new ExerciseTotalsDTO();
        parameter.setExercise(exerciseDTO);

        final List<ExerciseTotalsDTO> foundExerciseTotal = exerciseTotals.stream().filter(parameter::equals).collect(Collectors.toList());

        if (foundExerciseTotal.size() == 0) {
            final ReportTotalsDTO reportTotalsDTO = new ReportTotalsDTO();
            reportTotalsDTO.increaseUnknown();
            parameter.setTotals(reportTotalsDTO);
            exerciseTotals.add(parameter);
        } else {
            ExerciseTotalsDTO found = foundExerciseTotal.get(0);
            found.getTotals().increaseUnknown();
        }
    }

    public void increaseExerciseError(ExerciseDTO exerciseDTO) {
        ExerciseTotalsDTO parameter = new ExerciseTotalsDTO();
        parameter.setExercise(exerciseDTO);

        final List<ExerciseTotalsDTO> foundExerciseTotal = exerciseTotals.stream().filter(parameter::equals).collect(Collectors.toList());

        if (foundExerciseTotal.size() == 0) {
            final ReportTotalsDTO reportTotalsDTO = new ReportTotalsDTO();
            reportTotalsDTO.increaseError();
            parameter.setTotals(reportTotalsDTO);
            exerciseTotals.add(parameter);
        } else {
            ExerciseTotalsDTO found = foundExerciseTotal.get(0);
            found.getTotals().increaseError();
        }
    }

    public void increaseExerciseDone(ExerciseDTO exerciseDTO) {
        ExerciseTotalsDTO parameter = new ExerciseTotalsDTO();
        parameter.setExercise(exerciseDTO);

        final List<ExerciseTotalsDTO> foundExerciseTotal = exerciseTotals.stream().filter(parameter::equals).collect(Collectors.toList());

        if (foundExerciseTotal.size() == 0) {
            final ReportTotalsDTO reportTotalsDTO = new ReportTotalsDTO();
            reportTotalsDTO.increaseDone();
            parameter.setTotals(reportTotalsDTO);
            exerciseTotals.add(parameter);
        } else {
            ExerciseTotalsDTO found = foundExerciseTotal.get(0);
            found.getTotals().increaseDone();
        }
    }
}
