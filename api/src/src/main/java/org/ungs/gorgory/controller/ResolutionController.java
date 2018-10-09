package org.ungs.gorgory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.ungs.gorgory.service.ScopeCreatorService;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/resolution")
public class ResolutionController {

    private final ScopeCreatorService scopeCreatorService;

    @Autowired
    public ResolutionController(ScopeCreatorService scopeCreatorService, HttpServletRequest request) {
        this.scopeCreatorService = scopeCreatorService;
    }

    @PostMapping("/upload")
    public void upload(@RequestParam("file") MultipartFile file) throws IOException {
        String pathname = scopeCreatorService.createScope(file.getOriginalFilename());
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, new File(pathname).toPath(),
                    StandardCopyOption.REPLACE_EXISTING);
        }
    }

}
