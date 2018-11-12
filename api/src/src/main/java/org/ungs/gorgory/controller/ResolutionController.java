package org.ungs.gorgory.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.ungs.gorgory.enums.Language;
import org.ungs.gorgory.bean.dto.ResolutionDTO;
import org.ungs.gorgory.model.Exercise;
import org.ungs.gorgory.model.Resolution;
import org.ungs.gorgory.model.Result;
import org.ungs.gorgory.enums.ResultState;
import org.ungs.gorgory.repository.ExerciseRepository;
import org.ungs.gorgory.repository.ResolutionRepository;
import org.ungs.gorgory.security.UserRetrieverService;
import org.ungs.gorgory.service.CompressionService;
import org.ungs.gorgory.service.ExecutionerService;
import org.ungs.gorgory.service.ScopeCreatorService;
import org.ungs.gorgory.service.impl.JavaExecutionerService;
import org.ungs.gorgory.service.impl.PythonExecutionerService;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/resolution")
public class ResolutionController {

    private final ScopeCreatorService scopeCreatorService;
    private final CompressionService compressionService;
    private final ExerciseRepository exerciseRepository;
    private final JavaExecutionerService javaExecutionerService;
    private final PythonExecutionerService pythonExecutionerService;
    private final ResolutionRepository resolutionRepository;
    private final UserRetrieverService userRetrieverService;
    private final ModelMapper modelMapper;

    @Autowired
    public ResolutionController(
            ScopeCreatorService scopeCreatorService,
            CompressionService compressionService,
            ExerciseRepository exerciseRepository,
            JavaExecutionerService javaExecutionerService,
            PythonExecutionerService pythonExecutionerService,
            ResolutionRepository resolutionRepository,
            UserRetrieverService userRetrieverService,
            ModelMapper modelMapper) {
        this.scopeCreatorService = scopeCreatorService;
        this.compressionService = compressionService;
        this.exerciseRepository = exerciseRepository;
        this.javaExecutionerService = javaExecutionerService;
        this.pythonExecutionerService = pythonExecutionerService;
        this.resolutionRepository = resolutionRepository;
        this.userRetrieverService = userRetrieverService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/last/{exerciseId}")
    public ResponseEntity<ResolutionDTO> getResolution(@PathVariable Long exerciseId) {
        Optional<Resolution> resolution = resolutionRepository.findFirstByExerciseAndStudentOrderByCreateDateTimeDesc(new Exercise(exerciseId), userRetrieverService.getUser());
        return resolution.map(resolution1 -> ResponseEntity.ok(modelMapper.map(resolution1, ResolutionDTO.class))).orElse(null);
    }

    @PostMapping("/upload/{exerciseId}")
    public ResponseEntity<ResolutionDTO> upload(@RequestParam("file") MultipartFile file, @PathVariable("exerciseId") Long exerciseId) throws IOException {
        Optional<Exercise> optionalExercise = exerciseRepository.findById(exerciseId);
        if (!optionalExercise.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        Exercise selectedExercise = optionalExercise.get();
        String pathname = scopeCreatorService.createScope(file.getOriginalFilename());
        File newFile = new File(pathname);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, newFile.toPath(),
                    StandardCopyOption.REPLACE_EXISTING);
        }
        if (newFile.getName().endsWith(".zip")) {
            compressionService.unzip(newFile.getPath(), newFile.getParent());
        }

        Resolution newResolution = new Resolution();
        newResolution.setExercise(selectedExercise);
        newResolution.setPath(newFile.getParent());
        newResolution.setStudent(userRetrieverService.getUser());
        resolutionRepository.save(newResolution);

        if (selectedExercise.getLanguage().equals(Language.JAVA))
            doResolution(javaExecutionerService, selectedExercise, newResolution);
        else if (selectedExercise.getLanguage().equals(Language.PYTHON))
            doResolution(pythonExecutionerService, selectedExercise, newResolution);

        resolutionRepository.save(newResolution);

        return ResponseEntity.ok(modelMapper.map(newResolution, ResolutionDTO.class));
    }

    private void doResolution(ExecutionerService executionerService, Exercise selectedExercise, Resolution newResolution) {
        List<Result> results = selectedExercise.getTestCases().stream().map(testCase -> {
            try {
                return executionerService.runTestCaseOnResolution(newResolution, testCase);
            } catch (Exception e) {
                Result result = new Result();
                result.setState(ResultState.COMPILATION_ERROR);
                result.setOutput(e.toString());
                result.setResolution(newResolution);
                result.setTestCase(testCase);
                return result;
            }
        }).collect(Collectors.toList());
        newResolution.setResults(results);
    }

}
