package org.ungs.gorgory.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Resolution extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    private Exercise exercise;

    @ManyToOne
    private User student;

    private String path;

    @OneToMany(mappedBy = "resolution", cascade=CascadeType.ALL)
    @JsonManagedReference
    private Collection<Result> results;

    public Long getId() {
        return id;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Collection<Result> getResults() {
        return results;
    }

    public void setResults(Collection<Result> results) {
        this.results = results;
    }
}
