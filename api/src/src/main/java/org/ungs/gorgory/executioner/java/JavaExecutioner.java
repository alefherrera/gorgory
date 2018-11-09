package org.ungs.gorgory.executioner.java;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.ungs.gorgory.Language;
import org.ungs.gorgory.model.TestCase;
import org.ungs.gorgory.service.CommandFactoryService;
import org.ungs.gorgory.service.CommandRunnerService;

import java.io.File;
import java.util.Collection;
import java.util.Collections;
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
    public String execute(String path, TestCase testCase){

        String pwd = System.getProperty("user.dir");

        //Dame la lista de todos los .java
        List<File> javaFiles = javaFileFetcher.getAllFilesWithExtension(path, ".java");
        //JavaFileToTest javaFileToTest = javaFileFetcher.getFileToTest(javaFiles, testCase.getSignature());

        List<String> pathsStr = javaFiles.stream().map(x-> x.getAbsolutePath().substring(pwd.length() + path.length() + 2))
                .collect(Collectors.toList());

        //List<String> commands = commandFactoryService.getCommands("java", pathsStr, main.getAbsolutePath().replace(".java", ""));
        List<String> commands = commandFactoryService.getCommands(Language.JAVA, path);
        //TODO: alta negrada
        int javacCompileCommand = commands.get(0).indexOf("javac") + ("javac").length();
        String compileCommand = commands.get(0).substring(0, javacCompileCommand) + " " + String.join(" ", pathsStr);

        String echo = "echo -e \"" + testCase.getArgument() + "\"";

        int javacRumCommand = commands.get(1).indexOf("java") + ("java").length();
        String rumCommand = echo + " | " + commands.get(1).substring(0, javacRumCommand) + " Main" ;

        commandRunnerService.executeSingleCommand(compileCommand);

        String result = commandRunnerService.executeSingleCommand(rumCommand);

        return result.substring(0, result.length() - 1);


    }


}
