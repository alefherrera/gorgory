package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.dto.GuideDTO;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.security.IAuthenticatedUserRetriever;
import org.ungs.gorgory.service.GuideService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/guide")
public class GuideController {

    private final ModelMapper modelmapper;
    private final GuideService guideService;
    private final IAuthenticatedUserRetriever userRetriever;

    public GuideController(ModelMapper modelmapper, GuideService guideService, IAuthenticatedUserRetriever userRetriever) {
        this.modelmapper = modelmapper;
        this.guideService = guideService;
        this.userRetriever = userRetriever;
    }

    @PostMapping
    public GuideDTO create(@RequestBody GuideDTO dto) {
        Guide guide = modelmapper.map(dto, Guide.class);
        guide.getExercises().forEach(exercise -> {
            if (exercise.getLanguage() == null) {
                exercise.setLanguage(guide.getLanguage());
            }
        });
        guide.setUser(userRetriever.getAuthenticatedUser());
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
    public List<GuideDTO> getAll(@RequestParam("q") String query) {
        List<Guide> guides;
        if (query != null) {
            guides = guideService.getByQuery(query);
        } else {
            guides = guideService.getAll();
        }
        return guides.stream().map(this::getMap).collect(Collectors.toList());
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
