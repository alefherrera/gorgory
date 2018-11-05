package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.dto.GuideDTO;
import org.ungs.gorgory.bean.dto.UserDTO;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {


    private final ModelMapper modelmapper;
    private final UserService userService;

    public UserController(ModelMapper modelmapper, UserService userService) {
        this.modelmapper = modelmapper;
        this.userService = userService;
    }

    @PostMapping
    public UserDTO create(@RequestBody UserDTO dto) {
        User user = modelmapper.map(dto, User.class);
        return getMap(user);
    }

    @PutMapping("/{id}")
    public UserDTO update(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        User user = userService.get(id);
        modelmapper.map(userDTO, user);
        userService.save(user);
        return getMap(user);
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
