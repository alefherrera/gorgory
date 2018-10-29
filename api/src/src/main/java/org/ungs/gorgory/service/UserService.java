package org.ungs.gorgory.service;

import org.ungs.gorgory.bean.SignUpPayload;
import org.ungs.gorgory.model.User;

import java.util.Optional;

public interface UserService {

    void save(SignUpPayload payload);

    Optional<User> findByUsername(String username);
}
