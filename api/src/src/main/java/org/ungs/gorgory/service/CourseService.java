package org.ungs.gorgory.service;

import org.ungs.gorgory.model.Course;
import org.ungs.gorgory.model.User;

import java.util.Collection;

public interface CourseService {

    void subscribeUserToCourse(User user, Course course);
    void unsubscribeUserToCourse(User user, Course course);
    Collection<Course> getCoursesForUser(User user);
}
