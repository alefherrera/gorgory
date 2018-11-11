package org.ungs.gorgory.model;

public enum Roles {
    ADMIN(new Role(1L, "ADMIN")),
    STUDENT(new Role(2L, "ALUMNO")),
    TEACHER(new Role(3L, "PROFESOR"));

    private Role value;

    Roles(Role value) {
        this.value = value;
    }

    public Role getValue() {
        return value;
    }
}
