package org.ungs.gorgory.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.CodeEvaluationPayload;
import org.ungs.gorgory.service.CodeEvaluationService;
import org.ungs.gorgory.service.CommandFactoryService;
import org.ungs.gorgory.service.CommandRunnerService;
import org.ungs.gorgory.service.ScopeCreatorService;

@RestController
public class CodeEvaluationController {

    private ScopeCreatorService scopeCreatorService;
    private CommandFactoryService commandFactoryService;
    private CommandRunnerService commandRunnerService;
    private CodeEvaluationService codeEvaluationService;

    public  CodeEvaluationController(ScopeCreatorService scopeCreatorService,
                                     CommandFactoryService commandFactoryService,
                                     CommandRunnerService commandRunnerService, CodeEvaluationService codeEvaluationService){

        this.scopeCreatorService = scopeCreatorService;
        this.commandFactoryService = commandFactoryService;
        this.commandRunnerService = commandRunnerService;
        this.codeEvaluationService = codeEvaluationService;
    }

    //TODO: ahora solo con java
    @PostMapping("/test/{guid}")
    public boolean test(@PathVariable String guid, @RequestBody CodeEvaluationPayload input) {

        String folderOfGuid = scopeCreatorService.getFolderOfGuid(guid);

        String linkCommand = commandFactoryService.getLinkCommand(folderOfGuid);
        commandRunnerService.execute(linkCommand);

        String stdin = codeEvaluationService.getStdin(input);


        String jarCommand = commandFactoryService.getExecuteCommand(folderOfGuid, stdin);
        String stdout = commandRunnerService.execute(jarCommand);

        return codeEvaluationService.checkStdout(stdout);

    }

}
