package org.ungs.gorgory.service.impl;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.ungs.gorgory.Language;
import org.ungs.gorgory.exceptions.NoCodeFilesToCompileException;
import org.ungs.gorgory.exceptions.NoMainCodeFilePresentException;
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
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PythonExecutionerService implements ExecutionerService {

    private static final String MAIN_FILENAME_DEFINITION = "main.py";
    private final CommandFactoryService commandFactoryService;
    private final CommandRunnerService commandRunnerService;

    public PythonExecutionerService(@Qualifier("local") CommandFactoryService commandFactoryService,
                                    CommandRunnerService commandRunnerService) {
        this.commandFactoryService = commandFactoryService;
        this.commandRunnerService = commandRunnerService;
    }

    @Override
    public Result runTestCaseOnResolution(Resolution resolution, TestCase testCase) throws FileNotFoundException, UnsupportedEncodingException, NoCodeFilesToCompileException, NoMainCodeFilePresentException {
        Collection<String> codeFilesPath = obtainCodeFiles(resolution.getPath());
        Path inputFile = createInputFileFromArguments(resolution.getPath(), testCase.getArguments());
        Collection<String> commands = buildExecutionCommand(Language.PYTHON, codeFilesPath, inputFile);
        String result = commandRunnerService.execute(commands);
        eraseInputFile(inputFile);

        Result resolutionResult = new Result();
        resolutionResult.setResolution(resolution);
        resolutionResult.setTestCase(testCase);
        resolutionResult.setPassed(testCase.getExpected().equals(result));

        return resolutionResult;
    }

    private void eraseInputFile(Path inputFile) {
        if (inputFile != null) {
            inputFile.toFile().delete();
        }
    }

    private Collection<String> obtainCodeFiles(String resolutionPath) throws NoCodeFilesToCompileException, NoMainCodeFilePresentException {
        File dir = new File(resolutionPath);
        final File[] filesArray = dir.listFiles((d, name) -> name.endsWith(".py"));
        if (filesArray == null || filesArray.length <= 0)
            throw new NoCodeFilesToCompileException();

        List<File> files = new ArrayList<>(Arrays.asList(filesArray));
        Optional<File> mainFile = files.stream().filter(file -> file.getName().toLowerCase().equals(MAIN_FILENAME_DEFINITION)).findFirst();

        if (!mainFile.isPresent())
            throw new NoMainCodeFilePresentException();

        files.remove(mainFile.get());
        files.add(0, mainFile.get());

        return files.stream().map(File::toString).collect(Collectors.toList());
    }

    private Collection<String> buildExecutionCommand(Language lang, Collection<String> codeFilesPath, Path inputFilePath) {
        StringBuilder filesString = new StringBuilder();
        for (String codeFilePath : codeFilesPath)
            filesString.append(codeFilePath).append(" ");

        Collection<String> commands = commandFactoryService.getCommands(lang, filesString.toString());

        if (inputFilePath == null)
            return commands;

        List<String> commandList = new ArrayList<>(commands);
        String command = String.format("%s %s %s", commandList.get(0), " < ", inputFilePath.toString());
        commandList.set(0, command);
        return commandList;
    }

    private Path createInputFileFromArguments(String resolutionDir, Collection<Argument> arguments) throws FileNotFoundException, UnsupportedEncodingException {
        if (arguments.isEmpty())
            return null;

        Path filePath = Paths.get(resolutionDir, UUID.randomUUID().toString() + ".txt");
        PrintWriter writer = new PrintWriter(filePath.toFile(), "UTF-8");

        for (Argument argument : arguments) {
            writer.println(argument);
        }
        writer.close();

        return filePath;
    }
}
