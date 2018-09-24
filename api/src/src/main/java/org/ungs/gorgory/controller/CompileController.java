package org.ungs.gorgory.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.CompilePayload;
import org.ungs.gorgory.bean.CompileResponse;
import org.ungs.gorgory.service.CommandFactoryService;
import org.ungs.gorgory.service.CommandRunnerService;
import org.ungs.gorgory.service.ScopeCreatorService;

@RestController
public class CompileController {

    private final CommandRunnerService commandRunnerService;
    private final CommandFactoryService commandFactoryService;
    private final ScopeCreatorService scopeCreatorService;

    public CompileController(
            CommandRunnerService commandRunnerService,
            CommandFactoryService commandFactoryService,
            ScopeCreatorService scopeCreatorService
    ) {
        this.commandRunnerService = commandRunnerService;
        this.commandFactoryService = commandFactoryService;
        this.scopeCreatorService = scopeCreatorService;
    }

    @PostMapping("/compile")
    public CompileResponse compile(@RequestBody CompilePayload payload) {
        String path = scopeCreatorService.getPath(payload.getLang(), payload.getCode());
        String command = commandFactoryService.getCommand(payload.getLang(), path);
        String output = commandRunnerService.execute(command);
        return new CompileResponse(output);
    }

}
