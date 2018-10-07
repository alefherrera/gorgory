package org.ungs.gorgory.controller;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.ungs.gorgory.Language;
import org.ungs.gorgory.bean.CompilePayload;
import org.ungs.gorgory.bean.CompileResponse;
import org.ungs.gorgory.service.CommandFactoryService;
import org.ungs.gorgory.service.CommandRunnerService;
import org.ungs.gorgory.service.ScopeCreatorService;

import java.util.Collection;
import java.util.Collections;

@RestController
public class CompileController {

    private final CommandRunnerService commandRunnerService;
    private final CommandFactoryService commandFactoryService;
    private final ScopeCreatorService scopeCreatorService;

    public CompileController(
            CommandRunnerService commandRunnerService,
            @Qualifier("docker") CommandFactoryService commandFactoryService,
            ScopeCreatorService scopeCreatorService
    ) {
        this.commandRunnerService = commandRunnerService;
        this.commandFactoryService = commandFactoryService;
        this.scopeCreatorService = scopeCreatorService;
    }

    @PostMapping("/compile")
    public CompileResponse compile(@RequestBody CompilePayload payload) {
        String path = scopeCreatorService.getPath(payload.getLang(), payload.getCode());
        Collection<String> commands = commandFactoryService.getCommands(Language.valueOf(payload.getLang().toUpperCase()), path);
        String output = commandRunnerService.execute(commands);
        return new CompileResponse(output);
    }

    @GetMapping("/echo/{text}")
    @Secured("ROLE_ADMIN")
    public String echo(@PathVariable String text) {
        return commandRunnerService.execute(Collections.singletonList("echo " + text));
    }

}
