package org.ungs.gorgory.controller;


import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.dto.ExerciseDTO;
import org.ungs.gorgory.bean.dto.UserDTO;
import org.ungs.gorgory.bean.dto.report.CourseReportDTO;
import org.ungs.gorgory.bean.dto.report.ExerciseReportDTO;
import org.ungs.gorgory.bean.dto.report.GuideReportDTO;
import org.ungs.gorgory.bean.dto.report.ReportResultDTO;
import org.ungs.gorgory.bean.dto.report.ReportTotalsDTO;
import org.ungs.gorgory.bean.dto.report.StudentReportDTO;
import org.ungs.gorgory.enums.ResultState;
import org.ungs.gorgory.model.Course;
import org.ungs.gorgory.model.Exercise;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.model.Resolution;
import org.ungs.gorgory.model.Result;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.repository.ResolutionRepository;
import org.ungs.gorgory.service.GuideService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/guide")
public class ReportController {

    private GuideService guideService;
    private final ModelMapper modelmapper;
    private ResolutionRepository resolutionRepository;

    public ReportController(GuideService guideService, ResolutionRepository resolutionRepository, ModelMapper modelMapper) {
        this.guideService = guideService;
        this.modelmapper = modelMapper;
        this.resolutionRepository = resolutionRepository;
    }

    @GetMapping("/{id}/report")
    public GuideReportDTO getReport(@PathVariable Long id) {
        Guide g = guideService.get(id);
        if (g == null)
            return null;

        GuideReportDTO dto = new GuideReportDTO();
        dto.setName(g.getName());
        List<CourseReportDTO> courses = new ArrayList<>();

        for (Course course :
                g.getCourses()) {

            CourseReportDTO courseReportDTO = new CourseReportDTO();
            courseReportDTO.setTotals(new ReportTotalsDTO());
            courseReportDTO.setName(course.getName());
            List<StudentReportDTO> studentReportDTOS = new ArrayList<>();

            for (User student :
                    course.getStudents()) {
                StudentReportDTO studentReportDTO = new StudentReportDTO();
                studentReportDTO.setTotals(new ReportTotalsDTO());
                studentReportDTO.setStudent(modelmapper.map(student, UserDTO.class));
                List<ExerciseReportDTO> exerciseReportDTOS = new ArrayList<>();

                for (Exercise exercise :
                        g.getExercises()) {

                    ExerciseReportDTO exerciseReportDTO = new ExerciseReportDTO();
                    ExerciseDTO exerciseDTO = modelmapper.map(exercise, ExerciseDTO.class);
                    exerciseReportDTO.setExercise(exerciseDTO);

                    List<Resolution> resolutions = resolutionRepository.findAllByExerciseAndStudentOrderByCreateDateTimeDesc(exercise, student);
                    ReportResultDTO reportResultDTO = new ReportResultDTO();

                    if (resolutions.size() == 0) {
                        reportResultDTO.setStatus("unknown");
                        courseReportDTO.getTotals().increaseUnknown();
                        studentReportDTO.getTotals().increaseUnknown();
                        dto.increaseExerciseUnknown(exerciseDTO);
                    } else {
                        Resolution r = resolutions.get(0);

                        for (Result res : r.getResults()) {
                            if (res.getState() == ResultState.NOT_PASSED || res.getState() == ResultState.COMPILATION_ERROR) {
                                reportResultDTO.setStatus("error");
                                courseReportDTO.getTotals().increaseError();
                                studentReportDTO.getTotals().increaseError();
                                dto.increaseExerciseError(exerciseDTO);
                                break;
                            } else {
                                reportResultDTO.setStatus("done");
                                courseReportDTO.getTotals().increaseDone();
                                studentReportDTO.getTotals().increaseDone();
                                dto.increaseExerciseDone(exerciseDTO);
                            }
                        }
                    }

                    exerciseReportDTO.setResult(reportResultDTO);
                    exerciseReportDTOS.add(exerciseReportDTO);
                }
                studentReportDTO.setExerciseResults(exerciseReportDTOS);
                studentReportDTOS.add(studentReportDTO);
            }
            courseReportDTO.setStudents(studentReportDTOS);
            courses.add(courseReportDTO);
        }

        dto.setCourses(courses);

        return dto;

    }

}
