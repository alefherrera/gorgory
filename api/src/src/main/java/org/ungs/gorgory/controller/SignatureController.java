package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.dto.SignatureDTO;
import org.ungs.gorgory.model.Signature;
import org.ungs.gorgory.service.SignatureService;

import java.util.List;
import java.util.stream.Collectors;

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
    public void create(@RequestBody SignatureDTO dto) {
        Signature signature = modelmapper.map(dto, Signature.class);
        signatureService.save(signature);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody SignatureDTO dto) {
      /*  User user = userService.get(id);
        userService.save(payload);
        return getMap(user);*/
    }

    @GetMapping
    public List<SignatureDTO> getAll() {
        return signatureService.getAll().stream().map(this::getMap).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public SignatureDTO get(@PathVariable Long id) {
        Signature signature = signatureService.get(id);
        return getMap(signature);
    }

    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return signatureService.delete(id);
    }

    private SignatureDTO getMap(Signature signature) {
        return modelmapper.map(signature, SignatureDTO.class);
    }

}
