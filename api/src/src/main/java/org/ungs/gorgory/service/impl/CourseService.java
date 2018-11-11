package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.model.Course;
import org.ungs.gorgory.model.Roles;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.repository.CourseRepository;
import org.ungs.gorgory.repository.UserRepository;

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
            course.addStudent(user);
            user.addLearningCourse(course);
        } else if (user.getRole().equals(Roles.TEACHER.getValue())) {
            course.addTeacher(user);
            user.addTeachingCourse(course);
        }
        courseRepository.save(course);
        userRepository.save(user);
    }

    @Override
    public void unsubscribeUserToCourse(User user, Course course) {
        if (user.getRole().equals(Roles.STUDENT.getValue())) {
            course.removeStudent(user);
            user.removeLearningCourse(course);
        } else if (user.getRole().equals(Roles.TEACHER.getValue())) {
            course.removeTeacher(user);
            user.removeTeachingCourse(course);
        }
        courseRepository.save(course);
        userRepository.save(user);
    }
}
