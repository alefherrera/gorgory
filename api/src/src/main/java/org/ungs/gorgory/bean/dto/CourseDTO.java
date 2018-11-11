package org.ungs.gorgory.bean.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collection;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("teachers")
    private Collection<UserDTO> teachers;

    @JsonProperty("students")
    private Collection<UserDTO> students;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Collection<UserDTO> getTeachers() {
        return teachers;
    }

    public void setTeachers(Collection<UserDTO> teachers) {
        this.teachers = teachers;
    }

    public Collection<UserDTO> getStudents() {
        return students;
    }

    public void setStudents(Collection<UserDTO> students) {
        this.students = students;
    }
}
