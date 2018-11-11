package org.ungs.gorgory.model;

import javax.persistence.*;
import java.util.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String username;

    private String password;

    private String name;

    private String email;

    @OneToOne
    private Role role;

    @ManyToMany(mappedBy = "teachers")
    private Set<Course> teachingCourses;

    @ManyToMany(mappedBy = "students")
    private Set<Course> learningCourses;

    public User() {}

    public User(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<Course> getTeachingCourses() {
        return teachingCourses;
    }

    public void setTeachingCourses(Set<Course> teachingCourses) {
        this.teachingCourses = teachingCourses;
    }

    public Set<Course> getLearningCourses() {
        return learningCourses;
    }

    public void setLearningCourses(Set<Course> learningCourses) {
        this.learningCourses = learningCourses;
    }

    public void addLearningCourse(Course course) {
        if (this.learningCourses == null)
            setLearningCourses(new HashSet<>());
        this.learningCourses.add(course);
    }

    public void removeLearningCourse(Course course) {
        if (this.learningCourses != null)
            this.learningCourses.remove(course);
    }

    public void addTeachingCourse(Course course) {
        if (this.teachingCourses == null)
            setTeachingCourses(new HashSet<>());
        this.teachingCourses.add(course);
    }

    public void removeTeachingCourse(Course course) {
        if (this.teachingCourses != null)
            this.teachingCourses.remove(course);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
