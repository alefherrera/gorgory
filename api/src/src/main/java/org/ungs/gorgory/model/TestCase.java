package org.ungs.gorgory.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class TestCase extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    private Exercise exercise;

    @OneToMany(mappedBy = "testCase")
    private Collection<Argument> arguments;

    private String expected;

    public Long getId() {
        return id;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Collection<Argument> getArguments() {
        return arguments;
    }

    public void setArguments(Collection<Argument> arguments) {
        this.arguments = arguments;
    }

    public String getExpected() {
        return expected;
    }

    public void setExpected(String expected) {
        this.expected = expected;
    }
}
