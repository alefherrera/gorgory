package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.dto.ExerciseDTO;
import org.ungs.gorgory.model.Exercise;
import org.ungs.gorgory.repository.ExerciseRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/exercise")
public class ExerciseController {

    private ExerciseRepository exerciseRepository;
    private ModelMapper modelMapper;

    public ExerciseController(ExerciseRepository exerciseRepository, ModelMapper modelMapper) {
        this.exerciseRepository = exerciseRepository;
        this.modelMapper = modelMapper;
    }

    @GetMapping("{id}")
    public ResponseEntity<ExerciseDTO> get(@PathVariable Long id) {
        final Optional<Exercise> optionalExercise = exerciseRepository.findById(id);
        if (!optionalExercise.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return ResponseEntity.ok(modelMapper.map(optionalExercise.get(), ExerciseDTO.class));
    }

}
