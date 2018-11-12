package org.ungs.gorgory.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.ungs.gorgory.Language;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Entity
public class Guide extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String name;

    private Language language;

    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("guide")
    private Collection<Exercise> exercises;

    @OneToOne
    private User user;

    @ManyToMany(mappedBy = "guides")
    private Collection<Course> courses;

    private LocalDateTime start;

    private LocalDateTime end;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Collection<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(Collection<Exercise> exercises) {
        if (exercises != null) {
            exercises.forEach(exercise -> exercise.setGuide(this));
        }
        this.exercises = exercises;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public LocalDateTime getEnd() {
        return end;
    }

    public void setEnd(LocalDateTime end) {
        this.end = end;
    }

    public Collection<Course> getCourses() {
        return courses;
    }

    public void setCourses(Collection<Course> courses) {
        if (courses != null) {
            courses.forEach(course -> course.setGuides(Collections.singletonList(this)));
        }
        this.courses = courses;
    }
}
