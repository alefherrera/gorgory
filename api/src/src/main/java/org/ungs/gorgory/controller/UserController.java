package org.ungs.gorgory.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.LoginPayload;
import org.ungs.gorgory.bean.SignUpPayload;
import org.ungs.gorgory.service.UserService;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public void signUp(@RequestBody SignUpPayload payload) {
        userService.signUp(payload.getUsername(), payload.getPassword());
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginPayload payload) {
        userService.login(payload.getUsername(), payload.getPassword());
        return null;
    }

}
