package org.ungs.gorgory.service;

import org.ungs.gorgory.model.Course;
import org.ungs.gorgory.model.User;

public interface CourseService {

    void subscribeUserToCourse(User user, Course course);
    void unsubscribeUserToCourse(User user, Course course);

}
