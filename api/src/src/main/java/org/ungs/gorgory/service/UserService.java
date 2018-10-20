package org.ungs.gorgory.service;

import org.ungs.gorgory.model.User;

import java.util.Optional;

public interface UserService {

    void save(String username, String password);
    Optional<User> findByUsername(String username);
}
