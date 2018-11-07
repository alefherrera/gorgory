package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.dto.RoleDTO;
import org.ungs.gorgory.model.Role;
import org.ungs.gorgory.service.RoleService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    private final ModelMapper modelmapper;
    private final RoleService roleService;

    public RoleController(ModelMapper modelmapper, RoleService roleService) {
        this.modelmapper = modelmapper;
        this.roleService = roleService;
    }

    @PostMapping
    public RoleDTO create(@RequestBody RoleDTO dto) {
        Role role = modelmapper.map(dto, Role.class);
        return null;
//        roleService.save(role);
//        return getMap(role);
    }

    @PutMapping("/{id}")
    public RoleDTO update(@PathVariable Long id, @RequestBody RoleDTO userDTO) {
        /*User user = userService.get(id);
        modelmapper.map(userDTO, user);
        userService.save(user);
        return getMap(user);*/
        return null;
    }

    @GetMapping
    public List<RoleDTO> getAll() {
        return roleService.getAll().stream().map(this::getMap).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public RoleDTO get(@PathVariable Long id) {
        /*User user = userService.get(id);
        return getMap(user);*/
        return null;
    }

//    @DeleteMapping("/{id}")
//    public Long delete(@PathVariable Long id) {
//        return roleService.delete(id);
//    }


    private RoleDTO getMap(Role role) {
        return modelmapper.map(role, RoleDTO.class);
    }

}
