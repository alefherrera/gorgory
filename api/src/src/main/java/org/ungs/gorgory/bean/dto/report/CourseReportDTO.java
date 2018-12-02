package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseReportDTO {

    @JsonProperty("name")
    private String name;

    @JsonProperty("students")
    private List<StudentReportDTO> students;

    @JsonProperty("totals")
    private ReportTotalsDTO totals;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<StudentReportDTO> getStudents() {
        return students;
    }

    public void setStudents(List<StudentReportDTO> students) {
        this.students = students;
    }

    public ReportTotalsDTO getTotals() {
        return totals;
    }

    public void setTotals(ReportTotalsDTO totals) {
        this.totals = totals;
    }
}
