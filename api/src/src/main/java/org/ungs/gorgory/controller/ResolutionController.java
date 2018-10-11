package org.ungs.gorgory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.ungs.gorgory.Language;
import org.ungs.gorgory.exceptions.NoCodeFilesToCompileException;
import org.ungs.gorgory.exceptions.NoMainCodeFilePresentException;
import org.ungs.gorgory.executioner.java.JavaExecutioner;
import org.ungs.gorgory.model.Exercise;
import org.ungs.gorgory.model.Resolution;
import org.ungs.gorgory.model.Result;
import org.ungs.gorgory.repository.ExerciseRepository;
import org.ungs.gorgory.repository.ResolutionRepository;
import org.ungs.gorgory.service.CompressionService;
import org.ungs.gorgory.service.ExecutionerService;
import org.ungs.gorgory.service.ScopeCreatorService;
import org.ungs.gorgory.service.impl.JavaExecutionerService;
import org.ungs.gorgory.service.impl.PythonExecutionerService;

import java.io.*;
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
    private ExerciseRepository exerciseRepository;
    private JavaExecutionerService javaExecutionerService;
    private PythonExecutionerService pythonExecutionerService;
    private ResolutionRepository resolutionRepository;

    @Autowired
    public ResolutionController(ScopeCreatorService scopeCreatorService, CompressionService compressionService,
                                ExerciseRepository exerciseRepository, JavaExecutionerService javaExecutionerService,
                                PythonExecutionerService pythonExecutionerService, ResolutionRepository resolutionRepository) {
        this.scopeCreatorService = scopeCreatorService;
        this.compressionService = compressionService;
        this.exerciseRepository = exerciseRepository;
        this.javaExecutionerService = javaExecutionerService;
        this.pythonExecutionerService = pythonExecutionerService;
        this.resolutionRepository = resolutionRepository;
    }

    @PostMapping("/upload/{exerciseId}")
    public ResponseEntity<Resolution> upload(@RequestParam("file") MultipartFile file, @PathVariable("exerciseId") Long exerciseId) throws IOException {
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
        newResolution.setPath(pathname);
        newResolution.setStudent(null);
        resolutionRepository.save(newResolution);

        if (selectedExercise.getLanguage().equals(Language.JAVA)) {
            doResolution(javaExecutionerService,selectedExercise, newResolution);

        } else if (selectedExercise.getLanguage().equals(Language.PYTHON)) {
            doResolution(pythonExecutionerService,selectedExercise, newResolution);
        }

        resolutionRepository.save(newResolution);

        return ResponseEntity.ok(newResolution);
    }

    private void doResolution(ExecutionerService executionerService, Exercise selectedExercise, Resolution newResolution) {
        List<Result> results = selectedExercise.getTestCases().stream().map(testCase -> {
            try {
                return executionerService.runTestCaseOnResolution(newResolution, testCase);
            } catch (Exception e) {
                Result result = new Result();
                result.setPassed(false);
                result.setOutput(e.toString());
                result.setResolution(newResolution);
                result.setTestCase(testCase);
                return result;
            }
        }).collect(Collectors.toList());
        newResolution.setResults(results);
    }

}
