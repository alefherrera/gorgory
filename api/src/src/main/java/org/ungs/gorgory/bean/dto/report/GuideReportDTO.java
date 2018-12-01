package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GuideReportDTO {

    @JsonProperty("courses")
    private List<CourseReportDTO> courses;

    public List<CourseReportDTO> getCourses() {
        return courses;
    }

    public void setCourse(List<CourseReportDTO> courses) {
        this.courses = courses;
    }

}
