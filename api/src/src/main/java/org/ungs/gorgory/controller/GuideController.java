package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.bean.dto.GuideDTO;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.security.UserRetrieverService;
import org.ungs.gorgory.service.CourseService;
import org.ungs.gorgory.service.GuideService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/guide")
public class GuideController {

    private final ModelMapper modelmapper;
    private final GuideService guideService;
    private final UserRetrieverService userRetriever;
    private final CourseService courseService;

    public GuideController(ModelMapper modelmapper, GuideService guideService, UserRetrieverService userRetriever, CourseService courseService) {
        this.modelmapper = modelmapper;
        this.guideService = guideService;
        this.userRetriever = userRetriever;
        this.courseService = courseService;
    }

    @PostMapping
    public GuideDTO create(@RequestBody GuideDTO dto) {
        Guide guide = modelmapper.map(dto, Guide.class);
        //TODO: el mapper no mapea la fecha

        injectDatesAndCourses(guide, dto);

        guideService.save(guide);
        return getMap(guide);
    }

    @PutMapping("/{id}")
    public GuideDTO update(@PathVariable Long id, @RequestBody GuideDTO guideDTO) {
        Guide guide = modelmapper.map(guideDTO, Guide.class);

        //TODO: el mapper no mapea la fecha
        injectDatesAndCourses(guide, guideDTO);
        guide.setId(id);

        guideService.save(guide);
        return getMap(guide);
    }

    private void injectDatesAndCourses(Guide guide, GuideDTO guideDTO){
        guide.getExercises().forEach(exercise -> {
            if (exercise.getLanguage() == null) {
                exercise.setLanguage(guide.getLanguage());
            }
        });
        guide.setUser(userRetriever.getUser());
        guide.setCourses(guideDTO.getCourses().stream().map(course -> courseService.getById(course.getId())).collect(Collectors.toList()));

    }

    @GetMapping
    public List<GuideDTO> getAll(@RequestParam(value = "q", required = false) String query) {
        List<Guide> guides;
        if (query != null) {
            guides = guideService.getByQuery(query);
        } else {
            guides = guideService.getAll();
        }
        return guides.stream().map(this::getMap).collect(Collectors.toList());
    }

    @GetMapping("/active")
    public List<GuideDTO> getActiveGuidesForUser() {
        return guideService.getActiveGuidesForUser(userRetriever.getUser()).stream().map(this::getMap).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public GuideDTO get(@PathVariable Long id) {
        Guide guide = guideService.get(id);
        GuideDTO toRet = getMap(guide);
        return toRet;
    }

    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return guideService.delete(id);
    }


    private GuideDTO getMap(Guide guide) {
        return modelmapper.map(guide, GuideDTO.class);
    }

}
