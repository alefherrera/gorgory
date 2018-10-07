package org.ungs.gorgory.service.impl;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.ungs.gorgory.Language;
import org.ungs.gorgory.exceptions.NoCodeFilesToCompileException;
import org.ungs.gorgory.model.Argument;
import org.ungs.gorgory.model.Resolution;
import org.ungs.gorgory.model.Result;
import org.ungs.gorgory.model.TestCase;
import org.ungs.gorgory.service.CommandFactoryService;
import org.ungs.gorgory.service.CommandRunnerService;
import org.ungs.gorgory.service.ExecutionerService;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PythonExecutionerService implements ExecutionerService {

    private final CommandFactoryService commandFactoryService;
    private final CommandRunnerService commandRunnerService;

    public PythonExecutionerService(@Qualifier("local") CommandFactoryService commandFactoryService, CommandRunnerService commandRunnerService) {
        this.commandFactoryService = commandFactoryService;
        this.commandRunnerService = commandRunnerService;
    }

    @Override
    public Result runTestCaseOnResolution(Resolution resolution, TestCase testCase) throws FileNotFoundException, UnsupportedEncodingException, NoCodeFilesToCompileException {
        Collection<String> codeFilesPath = obtainCodeFiles(resolution.getPath());
        Path inputFile = createInputFileFromArguments(testCase.getArguments());
        Collection<String> commands = buildExecutionCommand(Language.PYTHON, codeFilesPath, inputFile);
        commandRunnerService.execute(commands);
        return null;
    }

    private Collection<String> obtainCodeFiles(String resolutionPath) throws NoCodeFilesToCompileException {
        File dir = new File(resolutionPath);
        final File[] fileList = dir.listFiles((d, name) -> name.endsWith(".py"));
        if (fileList != null)
            return Arrays.stream(fileList).map(File::toString).collect(Collectors.toList());

        throw new NoCodeFilesToCompileException();
    }

    private Collection<String> buildExecutionCommand(Language lang, Collection<String> codeFilesPath, Path inputFilePath) {
        StringBuilder filesString = new StringBuilder();
        for (String codeFilePath : codeFilesPath)
            filesString.append(codeFilePath).append(" ");

        Collection<String> commands = commandFactoryService.getCommands(lang, filesString.toString());
        List<String> commandList = new ArrayList<>(commands);
        String command = String.format("%s %s %s", commandList.get(0), " < ", inputFilePath.toString());
        commandList.set(0, command);
        return commandList;
    }

    private Path createInputFileFromArguments(Collection<Argument> arguments) throws FileNotFoundException, UnsupportedEncodingException {
        Path filePath = Paths.get(System.getProperty("user.home"), "input.txt");
        PrintWriter writer = new PrintWriter(filePath.toFile(), "UTF-8");

        for (Argument argument : arguments) {
            writer.println(argument);
        }
        writer.close();

        return filePath;
    }
}
