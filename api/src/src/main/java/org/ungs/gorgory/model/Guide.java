package org.ungs.gorgory.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.ungs.gorgory.Language;

import javax.persistence.*;
import java.util.Collection;

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
}
