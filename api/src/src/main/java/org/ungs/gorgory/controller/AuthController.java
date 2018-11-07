package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.JwtAuthenticationResponse;
import org.ungs.gorgory.bean.LoginPayload;
import org.ungs.gorgory.bean.SignUpPayload;
import org.ungs.gorgory.bean.dto.UserDTO;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.security.JwtTokenProvider;
import org.ungs.gorgory.service.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final ModelMapper modelMapper;

    public AuthController(UserService userService, AuthenticationManager authenticationManager,
                          JwtTokenProvider tokenProvider, ModelMapper modelMapper) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/signup")
    public void signUp(@RequestBody SignUpPayload payload) {
        userService.save(payload);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody LoginPayload payload) {
        if (payload.getPassword() == null) {
            payload.setPassword("");
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        payload.getUsername(),
                        payload.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final Optional<User> optionalUser = userService.findByUsername(payload.getUsername());

        if (optionalUser.isPresent()) {
            String jwt = tokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new JwtAuthenticationResponse(modelMapper.map(optionalUser.get(), UserDTO.class), jwt));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
