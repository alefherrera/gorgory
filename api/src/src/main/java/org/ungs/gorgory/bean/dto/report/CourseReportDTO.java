package org.ungs.gorgory.bean.dto.report;

import java.util.List;

public class CourseReportDTO {
    private List<StudentReportDTO> students;

    public List<StudentReportDTO> getStudents() {
        return students;
    }

    public void setStudents(List<StudentReportDTO> students) {
        this.students = students;
    }
}
