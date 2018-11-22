package org.ungs.gorgory.executioner.java;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.ungs.gorgory.enums.Language;
import org.ungs.gorgory.model.Argument;
import org.ungs.gorgory.model.TestCase;
import org.ungs.gorgory.service.CommandFactoryService;
import org.ungs.gorgory.service.CommandRunnerService;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
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
    public JavaExecutionerResult execute(String path, TestCase testCase){

        JavaExecutionerResult toRet = new JavaExecutionerResult();

        String pwd = System.getProperty("user.dir");

        //Dame la lista de todos los .java
        List<File> javaFiles = javaFileFetcher.getAllFilesWithExtension(path, ".java");
        //JavaFileToTest javaFileToTest = javaFileFetcher.getFileToTest(javaFiles, testCase.getSignature());

        //Crearme el main
        //File main = javaMainCreator.createMain(path, "Main" + testCase.getId(), javaFileToTest, testCase.getArguments());

        //javaFiles.add(main);

        List<String> pathsStr = javaFiles.stream().map(x-> x.getAbsolutePath().substring(pwd.length() + path.length() + 2))
                .collect(Collectors.toList());

        //List<String> commands = commandFactoryService.getCommands("java", pathsStr, main.getAbsolutePath().replace(".java", ""));
        List<String> commands = commandFactoryService.getCommands(Language.JAVA, path);
        //TODO: alta negrada
        int javacCompileCommand = commands.get(0).indexOf("javac") + ("javac").length();
        String compileCommand = commands.get(0).substring(0, javacCompileCommand) + " " + String.join(" ", pathsStr);


        File temp = null;
        try {
            temp = File.createTempFile("javaExecutioner", ".txt");

            BufferedWriter writer = new BufferedWriter(new FileWriter(temp));

            for (Argument arg:
                 testCase.getArguments()) {

                writer.write(arg.getValue());
                writer.newLine();
            }


            writer.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        String pipeCommand = "cat " + temp.getAbsolutePath() + " | ";


        int javacRumCommand = commands.get(1).indexOf("java") + ("java").length();
        String rumCommand = pipeCommand + commands.get(1).substring(0, javacRumCommand) + " Main";

        String compiledOutput = commandRunnerService.executeSingleCommand(compileCommand);

        if(compiledOutput.length() > 0){
            toRet.setCompilationError(true);
            toRet.setOputput(compiledOutput);
            return toRet;
        }

        String result = commandRunnerService.executeSingleCommand(rumCommand);

        toRet.setOputput(result.substring(0, result.length() - 1));
        toRet.setCompilationError(false);


        return toRet;


    }


}
