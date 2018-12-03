package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.bean.dto.ExerciseDTO;

import java.util.Objects;

public class ExerciseTotalsDTO {

    @JsonProperty("exercise")
    private ExerciseDTO exercise;

    @JsonProperty("totals")
    private ReportTotalsDTO totals;

    public ExerciseDTO getExercise() {
        return exercise;
    }

    public void setExercise(ExerciseDTO exercise) {
        this.exercise = exercise;
    }

    public ReportTotalsDTO getTotals() {
        return totals;
    }

    public void setTotals(ReportTotalsDTO totals) {
        this.totals = totals;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExerciseTotalsDTO that = (ExerciseTotalsDTO) o;
        return Objects.equals(exercise, that.exercise);
    }

    @Override
    public int hashCode() {
        return Objects.hash(exercise);
    }
}
