package org.ungs.gorgory.service.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.ungs.gorgory.bean.SignUpPayload;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.repository.RoleRepository;
import org.ungs.gorgory.repository.UserRepository;
import org.ungs.gorgory.service.UserService;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void save(SignUpPayload payload) {
        User user = new User();
        user.setUsername(payload.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(payload.getPassword()));
        user.setEmail(payload.getEmail());
        user.setName(payload.getName());
        user.setRole(roleRepository.findByName(payload.getRole()).orElse(null));
        userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
