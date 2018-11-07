package org.ungs.gorgory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.model.Course;
import org.ungs.gorgory.model.Roles;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.repository.CourseRepository;
import org.ungs.gorgory.security.IAuthenticatedUserRetriever;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    private CourseRepository courseRepository;
    private ObjectMapper objectMapper;
    private IAuthenticatedUserRetriever authenticatedUserRetriever;

    public CourseController(CourseRepository courseRepository, ObjectMapper objectMapper, IAuthenticatedUserRetriever authenticatedUserRetriever) {
        this.courseRepository = courseRepository;
        this.objectMapper = objectMapper;
        this.authenticatedUserRetriever = authenticatedUserRetriever;
    }

    @GetMapping
    public ResponseEntity<Collection<Course>> getCourses() {
        return new ResponseEntity<>(courseRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/{id}/subscribe")
    public ResponseEntity<Course> subscribeToCourse(@PathVariable Long id) {
        final Optional<Course> optionalCourse = courseRepository.findById(id);
        if (!optionalCourse.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Course course = optionalCourse.get();

        final User authenticatedUser = authenticatedUserRetriever.getAuthenticatedUser();
        if (authenticatedUser.getRole().equals(Roles.STUDENT)) {
            course.getStudents().add(authenticatedUser);
        } else if (authenticatedUser.getRole().equals(Roles.TEACHER)) {
            course.getTeachers().add(authenticatedUser);
        }
        courseRepository.save(course);
        return new ResponseEntity<>(course, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}/unsubscribe")
    public ResponseEntity<Course> unsubscribeToCourse(@PathVariable Long id) {
        final Optional<Course> optionalCourse = courseRepository.findById(id);
        if (!optionalCourse.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Course course = optionalCourse.get();

        final User authenticatedUser = authenticatedUserRetriever.getAuthenticatedUser();
        if (authenticatedUser.getRole().equals(Roles.STUDENT)) {
            course.getStudents().remove(authenticatedUser);
        } else if (authenticatedUser.getRole().equals(Roles.TEACHER)) {
            course.getTeachers().remove(authenticatedUser);
        }
        courseRepository.save(course);
        return new ResponseEntity<>(course, HttpStatus.ACCEPTED);
    }
}
