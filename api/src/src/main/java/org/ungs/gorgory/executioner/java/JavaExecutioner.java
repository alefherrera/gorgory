package org.ungs.gorgory.executioner.java;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.ungs.gorgory.model.TestCase;
import org.ungs.gorgory.service.CommandFactoryService;
import org.ungs.gorgory.service.CommandRunnerService;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JavaExecutioner {

    private CommandFactoryService commandFactoryService;
    private FileFetcher javaFileFetcher;
    private MainCreator javaMainCreator;
    private CommandRunnerService commandRunnerService;

    public JavaExecutioner(@Qualifier("docker") CommandFactoryService commandFactoryService,
                           FileFetcher javaFileFetcher,
                           MainCreator javaMainCreator,
                           CommandRunnerService commandRunnerService) {
        this.commandFactoryService = commandFactoryService;
        this.javaFileFetcher = javaFileFetcher;
        this.javaMainCreator = javaMainCreator;
        this.commandRunnerService = commandRunnerService;
    }


    //Funcion que testea cosas sin main
    public void execute(String path, TestCase testCase){

        //Dame la lista de todos los .java
        List<File> javaFiles = javaFileFetcher.getAllFilesWithExtension(path, ".java");
        JavaFileToTest javaFileToTest = javaFileFetcher.getFileToTest(javaFiles, testCase.getFunctionToTest());

        //Crearme el main
        File main = javaMainCreator.createMain("main" + testCase.getId(), javaFileToTest, testCase.getArguments());

        javaFiles.add(main);

        List<String> pathsStr = javaFiles.stream().map(x -> x.getAbsolutePath()).collect(Collectors.toList());

        List<String> commands = commandFactoryService.getCommands("java", pathsStr, main.getAbsolutePath());
        String compileCommand = commands.get(0);
        String rumCommand = commands.get(1);

        commandRunnerService.executeSingleCommand(compileCommand);

        String result = commandRunnerService.executeSingleCommand(rumCommand);




    }


}
