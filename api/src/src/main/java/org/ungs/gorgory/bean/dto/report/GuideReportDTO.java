package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GuideReportDTO {

    @JsonProperty("name")
    private String name;

    @JsonProperty("courses")
    private List<CourseReportDTO> courses;

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

}
