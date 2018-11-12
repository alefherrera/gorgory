package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.dto.CourseDTO;
import org.ungs.gorgory.model.Course;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.repository.CourseRepository;
import org.ungs.gorgory.security.UserRetrieverService;
import org.ungs.gorgory.service.CourseService;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    private CourseService courseService;
    private CourseRepository courseRepository;
    private final UserRetrieverService userRetrieverService;
    private ModelMapper modelMapper;

    public CourseController(CourseService courseService, CourseRepository courseRepository,
                            UserRetrieverService userRetrieverService, ModelMapper modelMapper) {
        this.courseService = courseService;
        this.courseRepository = courseRepository;
        this.userRetrieverService = userRetrieverService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<Collection<CourseDTO>> getCourses() {
        return new ResponseEntity<>(courseRepository.findAll().stream().map(x -> modelMapper.map(x, CourseDTO.class)).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/subscribed")
    public ResponseEntity<Collection<CourseDTO>> getCoursesForUser() {
        return new ResponseEntity<>(courseService.getCoursesForUser(userRetrieverService.getUser()).stream().map(x -> modelMapper.map(x, CourseDTO.class)).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> get(@PathVariable Long id) {
        return courseRepository.findById(id).map(course -> new ResponseEntity<>(modelMapper.map(course, CourseDTO.class), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}/subscribe")
    public ResponseEntity<CourseDTO> subscribeToCourse(@PathVariable Long id) {
        final Optional<Course> optionalCourse = courseRepository.findById(id);
        if (!optionalCourse.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Course course = optionalCourse.get();

        final User authenticatedUser = userRetrieverService.getUser();
        courseService.subscribeUserToCourse(authenticatedUser, course);
        return new ResponseEntity<>(modelMapper.map(course, CourseDTO.class), HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}/unsubscribe")
    public ResponseEntity<CourseDTO> unsubscribeToCourse(@PathVariable Long id) {
        final Optional<Course> optionalCourse = courseRepository.findById(id);
        if (!optionalCourse.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Course course = optionalCourse.get();

        final User authenticatedUser = userRetrieverService.getUser();
        courseService.unsubscribeUserToCourse(authenticatedUser, course);
        return new ResponseEntity<>(modelMapper.map(course, CourseDTO.class), HttpStatus.ACCEPTED);
    }
}
