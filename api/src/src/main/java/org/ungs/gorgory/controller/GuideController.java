package org.ungs.gorgory.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.GuideDto;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.model.Resolution;
import org.ungs.gorgory.service.GuideService;

@RestController
@RequestMapping("/api/guide")
public class GuideController {

    private GuideService guideService;

    public GuideController(GuideService guideService) {
        this.guideService = guideService;
    }

    @PostMapping("/new")
    public ResponseEntity<Guide> newGuide(@RequestBody GuideDto newGuide){

        try {
            Guide guide = guideService.saveNewGuide(newGuide);
            return ResponseEntity.ok(guide);
        }catch (IllegalArgumentException ex){

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }

}
