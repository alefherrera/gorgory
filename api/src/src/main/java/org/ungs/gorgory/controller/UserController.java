package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.SignUpPayload;
import org.ungs.gorgory.bean.dto.UserDTO;
import org.ungs.gorgory.bean.internal.MailPayload;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.service.MailService;
import org.ungs.gorgory.service.RoleService;
import org.ungs.gorgory.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {


    private final ModelMapper modelmapper;
    private final UserService userService;
    private final RoleService roleService;
    private final MailService mailService;

    public UserController(ModelMapper modelmapper, UserService userService, RoleService roleService, MailService mailService) {
        this.modelmapper = modelmapper;
        this.userService = userService;
        this.roleService = roleService;
        this.mailService = mailService;
    }

    @PostMapping
    public void create(@RequestBody SignUpPayload payload) {
        payload.setPassword("");
        userService.save(payload);
        String body = "<h1>Usuario</h1><h3>" + payload.getUsername() + "</h3><span>la primera vez podra ingresar sin contraseña</span>";
        MailPayload mailPayload = new MailPayload(payload.getEmail(), "Nuevo acceso a gorgory", body);
        mailService.send(mailPayload);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody SignUpPayload payload) {
      /*  User user = userService.get(id);
        userService.save(payload);
        return getMap(user);*/

    }

    @GetMapping
    public List<UserDTO> getAll(@RequestParam(value = "q", required = false) String query) {
        return userService.getAll().stream().map(this::getMap).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public UserDTO get(@PathVariable Long id) {
        User user = userService.get(id);
        return getMap(user);
    }

    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return userService.delete(id);
    }

    private UserDTO getMap(User user) {
        return modelmapper.map(user, UserDTO.class);
    }

}
