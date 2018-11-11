package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.SignUpPayload;
import org.ungs.gorgory.service.SignatureService;

import java.util.List;

@RestController
@RequestMapping("/api/signature")
public class SignatureController {

    private final ModelMapper modelmapper;
    private final SignatureService signatureService;

    public SignatureController(ModelMapper modelmapper, SignatureService signatureService) {
        this.modelmapper = modelmapper;
        this.signatureService = signatureService;
    }

    @PostMapping
    public void create(@RequestBody SignUpPayload payload) {
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody SignUpPayload payload) {
      /*  User user = userService.get(id);
        userService.save(payload);
        return getMap(user);*/

    }

    @GetMapping
    public List<?> getAll() {
        return null;
    }
/*
    @GetMapping("/{id}")
    public Object get(@PathVariable Long id) {
        User user = userService.get(id);
        return getMap(user);
    }*/

//    @DeleteMapping("/{id}")
//    public Long delete(@PathVariable Long id) {
//        return userService.delete(id);
//    }


//    private UserDTO getMap(User user) {
//        return modelmapper.map(user, UserDTO.class);
//    }

}
