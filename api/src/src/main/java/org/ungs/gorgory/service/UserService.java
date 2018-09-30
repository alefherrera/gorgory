package org.ungs.gorgory.service;

import org.ungs.gorgory.model.User;

public interface UserService {

    void signUp(String username, String password);

    User login(String username, String password);

}
