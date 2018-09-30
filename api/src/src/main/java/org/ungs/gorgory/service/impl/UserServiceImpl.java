package org.ungs.gorgory.service.impl;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.repository.UserRepository;
import org.ungs.gorgory.service.UserService;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void signUp(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(user);
    }

    public User login(String username, String password) {
        Optional<User> find = userRepository.findOne((Specification<User>) (root, query, cb) -> cb.equal(root.get("username"), username));
        if (find.isPresent()) {
            User user = find.get();
            boolean matches = bCryptPasswordEncoder.matches(password, user.getPassword());
            if (matches) return user;
            return null;
        }
        return null;
    }
}
