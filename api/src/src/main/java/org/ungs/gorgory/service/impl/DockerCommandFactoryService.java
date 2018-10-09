package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.Language;
import org.ungs.gorgory.service.CommandFactoryService;

import java.io.File;
import java.util.*;
import java.util.function.Function;

@Service("docker")
public class DockerCommandFactoryService implements CommandFactoryService {

    private final Map<Language, Function<String, Collection<String>>> commandMap;

    public DockerCommandFactoryService() {
        commandMap = new HashMap<>();
        commandMap.put(Language.JAVA, this::buildJavaCommand);
        commandMap.put(Language.PYTHON, this::buildPythonCommand);
    }

    public Collection<String> getCommands(Language lang, String path) {
        return commandMap.get(lang).apply(path);
    }

    private Collection<String> buildJavaCommand(String path) {
        File filePath = new File(path);
        String folder = filePath.getParent();
        String dockerCommand = getDockerCommand(folder);
        String compile = dockerCommand + " openjdk:8-alpine javac Script.java";
        String run = dockerCommand + " openjdk:8-alpine java Script";
        return Arrays.asList(compile, run);
    }

    private Collection<String> buildPythonCommand(String path) {
        File filePath = new File(path);
        String folder = filePath.getParent();
        String run = getDockerCommand(folder) + " python:2-alpine python script.py";
        return Collections.singletonList(run);
    }

    private String getDockerCommand(String folder) {
        return "docker run --rm -v $PWD:/app -w /app/" + folder;
    }

}
