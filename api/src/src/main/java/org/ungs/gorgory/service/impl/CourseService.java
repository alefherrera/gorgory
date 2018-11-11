package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.model.Course;
import org.ungs.gorgory.model.Roles;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.repository.CourseRepository;
import org.ungs.gorgory.repository.UserRepository;

import java.util.Optional;

@Service
public class CourseService implements org.ungs.gorgory.service.CourseService {

    private CourseRepository courseRepository;
    private UserRepository userRepository;

    public CourseService(CourseRepository courseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void subscribeUserToCourse(User user, Course course) {
        if (user.getRole().equals(Roles.STUDENT.getValue())) {
            Optional.ofNullable(course.getStudents()).ifPresent(x -> x.add(user));
            Optional.ofNullable(user.getLearningCourses()).ifPresent(x -> x.add(course));
        } else if (user.getRole().equals(Roles.TEACHER.getValue())) {
            Optional.ofNullable(course.getTeachers()).ifPresent(x -> x.add(user));
            Optional.ofNullable(user.getTeachingCourses()).ifPresent(x -> x.add(course));
        }
        courseRepository.save(course);
        userRepository.save(user);
    }

    @Override
    public void unsubscribeUserToCourse(User user, Course course) {
        if (user.getRole().equals(Roles.STUDENT.getValue())) {
            Optional.ofNullable(course.getStudents()).ifPresent(x -> x.remove(user));
            Optional.ofNullable(user.getLearningCourses()).ifPresent(x -> x.remove(course));
        } else if (user.getRole().equals(Roles.TEACHER.getValue())) {
            Optional.ofNullable(course.getTeachers()).ifPresent(x -> x.remove(user));
            Optional.ofNullable(user.getTeachingCourses()).ifPresent(x -> x.remove(course));
        }
        courseRepository.save(course);
        userRepository.save(user);
    }
}
