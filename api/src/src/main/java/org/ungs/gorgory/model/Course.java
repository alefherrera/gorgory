package org.ungs.gorgory.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Course extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String name;

    private String description;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "course_teachers",
            joinColumns = {@JoinColumn(name = "course_id")},
            inverseJoinColumns = {@JoinColumn(name = "teacher_id")}
    )
    private Set<User> teachers;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "course_students",
            joinColumns = {@JoinColumn(name = "course_id")},
            inverseJoinColumns = {@JoinColumn(name = "student_id")}
    )
    private Set<User> students;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "course_guides",
            joinColumns = {@JoinColumn(name = "course_id")},
            inverseJoinColumns = {@JoinColumn(name = "guide_id")}
    )
    private List<Guide> guides;

    @ManyToOne
    private Signature signature;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getTeachers() {
        return teachers;
    }

    public void setTeachers(Set<User> teachers) {
        this.teachers = teachers;
    }

    public Set<User> getStudents() {
        return students;
    }

    public void setStudents(Set<User> students) {
        this.students = students;
    }

    public List<Guide> getGuides() {
        return guides;
    }

    public void setGuides(List<Guide> guides) {
        this.guides = guides;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Signature getSignature() {
        return signature;
    }

    public void setSignature(Signature signature) {
        this.signature = signature;
    }

    public void addTeacher(User user) {
        if (this.teachers == null)
            this.teachers = new HashSet<>();
        this.teachers.add(user);
    }

    public void removeTeacher(User user) {
        if (this.teachers != null)
            this.teachers.remove(user);
    }

    public void addStudent(User user) {
        if (this.students == null)
            this.students = new HashSet<>();
        this.students.add(user);
    }

    public void removeStudent(User user) {
        if (this.students != null)
            this.students.remove(user);
    }


}
