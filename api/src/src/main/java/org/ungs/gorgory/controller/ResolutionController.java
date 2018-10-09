package org.ungs.gorgory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.ungs.gorgory.service.CompressionService;
import org.ungs.gorgory.service.ScopeCreatorService;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/resolution")
public class ResolutionController {

    private final ScopeCreatorService scopeCreatorService;
    private final CompressionService compressionService;

    @Autowired
    public ResolutionController(ScopeCreatorService scopeCreatorService, CompressionService compressionService) {
        this.scopeCreatorService = scopeCreatorService;
        this.compressionService = compressionService;
    }

    @PostMapping("/upload")
    public void upload(@RequestParam("file") MultipartFile file) throws IOException {
        String pathname = scopeCreatorService.createScope(file.getOriginalFilename());
        File newFile = new File(pathname);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, newFile.toPath(),
                    StandardCopyOption.REPLACE_EXISTING);
        }
        if (newFile.getName().endsWith(".zip")) {
            compressionService.unzip(newFile.getPath(), newFile.getParent());
        }
    }

}
