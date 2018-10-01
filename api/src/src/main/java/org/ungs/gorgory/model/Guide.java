package org.ungs.gorgory.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Guide extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "guide")
    private Collection<Exercise> exercises;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(Collection<Exercise> exercises) {
        this.exercises = exercises;
    }
}
