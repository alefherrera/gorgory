package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.dto.GuideDTO;
import org.ungs.gorgory.model.Argument;
import org.ungs.gorgory.model.Exercise;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.model.TestCase;
import org.ungs.gorgory.service.GuideService;

import java.util.ArrayList;
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
    public GuideDTO create(@RequestBody GuideDTO dto) {
        Guide guide = modelmapper.map(dto, Guide.class);
        guide.getExercises().forEach(exercise -> {
            if (exercise.getLanguage() == null) {
                exercise.setLanguage(guide.getLanguage());
            }
        });
        guideService.save(guide);
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
