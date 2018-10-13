package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.dto.GuideDTO;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.service.GuideService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/guide")
public class GuideController {

    private final ModelMapper modelmapper;
    private GuideService guideService;

    public GuideController(ModelMapper modelmapper, GuideService guideService) {
        this.modelmapper = modelmapper;
        this.guideService = guideService;
    }

    @PostMapping
    public GuideDTO create(@RequestBody GuideDTO guideDTO) {
        Guide map = modelmapper.map(guideDTO, Guide.class);
        Guide guide = guideService.save(map);
        return getMap(guide);
    }

    @PutMapping("/{id}")
    public GuideDTO update(@PathVariable Long id, @RequestBody GuideDTO guideDTO) {
        Guide guide = guideService.get(id);
        modelmapper.map(guideDTO, guide);
        guideService.save(guide);
        return getMap(guide);
    }

    @GetMapping
    public List<GuideDTO> getAll() {
        return guideService.getAll().stream().map(this::getMap).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public GuideDTO getAll(@PathVariable Long id) {
        Guide guide = guideService.get(id);
        return getMap(guide);
    }

    private GuideDTO getMap(Guide guide) {
        return modelmapper.map(guide, GuideDTO.class);
    }

}
