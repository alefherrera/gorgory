package org.ungs.gorgory.service;

import org.ungs.gorgory.model.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    List<Role> getAll();

    Optional<Role> findByName(String name);
}
