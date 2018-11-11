package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.dto.CourseDTO;
import org.ungs.gorgory.model.Course;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.repository.CourseRepository;
import org.ungs.gorgory.security.IAuthenticatedUserRetriever;
import org.ungs.gorgory.service.CourseService;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    private CourseService courseService;
    private CourseRepository courseRepository;
    private IAuthenticatedUserRetriever authenticatedUserRetriever;
    private ModelMapper modelMapper;

    public CourseController(CourseService courseService, CourseRepository courseRepository,
                            IAuthenticatedUserRetriever authenticatedUserRetriever, ModelMapper modelMapper) {
        this.courseService = courseService;
        this.courseRepository = courseRepository;
        this.authenticatedUserRetriever = authenticatedUserRetriever;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<Collection<CourseDTO>> getCourses() {
        return new ResponseEntity<>(courseRepository.findAll().stream().map(x -> modelMapper.map(x, CourseDTO.class)).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> get(@PathVariable Long id) {
        return courseRepository.findById(id).map(course -> new ResponseEntity<>(modelMapper.map(course, CourseDTO.class), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}/subscribe")
    public ResponseEntity<Course> subscribeToCourse(@PathVariable Long id) {
        final Optional<Course> optionalCourse = courseRepository.findById(id);
        if (!optionalCourse.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Course course = optionalCourse.get();

        final User authenticatedUser = authenticatedUserRetriever.getAuthenticatedUser();
        courseService.subscribeUserToCourse(authenticatedUser, course);
        return new ResponseEntity<>(course, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}/unsubscribe")
    public ResponseEntity<Course> unsubscribeToCourse(@PathVariable Long id) {
        final Optional<Course> optionalCourse = courseRepository.findById(id);
        if (!optionalCourse.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Course course = optionalCourse.get();

        final User authenticatedUser = authenticatedUserRetriever.getAuthenticatedUser();
        courseService.unsubscribeUserToCourse(authenticatedUser, course);
        return new ResponseEntity<>(course, HttpStatus.ACCEPTED);
    }
}
