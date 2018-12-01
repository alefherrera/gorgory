package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseReportDTO {

    @JsonProperty("students")
    private List<StudentReportDTO> students;

    public List<StudentReportDTO> getStudents() {
        return students;
    }

    public void setStudents(List<StudentReportDTO> students) {
        this.students = students;
    }
}
