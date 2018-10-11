package org.ungs.gorgory.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.ungs.gorgory.Language;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Exercise extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private Language language;

    @ManyToOne
    @JsonIgnoreProperties("exercises")
    private Guide guide;

    @OneToMany(mappedBy = "exercise", cascade=CascadeType.ALL)
    @JsonIgnoreProperties("exercise")
    private Collection<TestCase> testCases;

    public Long getId() {
        return id;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Guide getGuide() {
        return guide;
    }

    public void setGuide(Guide guide) {
        this.guide = guide;
    }

    public Collection<TestCase> getTestCases() {
        return testCases;
    }

    public void setTestCases(Collection<TestCase> testCases) {
        this.testCases = testCases;
    }
}
