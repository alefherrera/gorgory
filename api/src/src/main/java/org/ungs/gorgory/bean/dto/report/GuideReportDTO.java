package org.ungs.gorgory.bean.dto.report;

import java.util.List;

public class GuideReportDTO {

    private List<CourseReportDTO> course;

    public List<CourseReportDTO> getCourse() {
        return course;
    }

    public void setCourse(List<CourseReportDTO> course) {
        this.course = course;
    }

}
