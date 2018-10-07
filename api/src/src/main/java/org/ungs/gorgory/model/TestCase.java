package org.ungs.gorgory.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
public class TestCase extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @ManyToOne
    private Exercise exercise;

    @OneToMany(mappedBy = "testCase")
    private List<Argument> arguments;

    private String expected;

    private String functionToTest;

    public Long getId() {
        return id;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public List<Argument> getArguments() {
        return arguments;
    }

    public void setArguments(List<Argument> arguments) {
        this.arguments = arguments;
    }

    public String getExpected() {
        return expected;
    }

    public void setExpected(String expected) {
        this.expected = expected;
    }

    public String getFunctionToTest() {
        return functionToTest;
    }

    public void setFunctionToTest(String functionToTest) {
        this.functionToTest = functionToTest;
    }
}
