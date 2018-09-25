package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.service.CommandFactoryService;

import java.io.File;
import java.util.*;
import java.util.function.Function;

@Service("docker")
public class DockerCommandFactoryService implements CommandFactoryService {

    private final Map<String, Function<String, Collection<String>>> commandMap;

    public DockerCommandFactoryService() {
        commandMap = new HashMap<>();
        commandMap.put("java", this::buildJavaCommand);
        commandMap.put("python", this::buildPythonCommand);
    }

    public Collection<String> getCommands(String lang, String path) {
        return commandMap.get(lang).apply(path);
    }

    private Collection<String> buildJavaCommand(String path) {
        File filePath = new File(path);
        String folder = filePath.getParent();
        String compile = "docker run --rm -v $PWD:/app -w /app/" + folder + " openjdk:8-alpine javac Script.java";
        String run = "docker run --rm -v $PWD:/app -w /app/" + folder + " openjdk:8-alpine java Script";
        return Arrays.asList(compile, run);
    }

    private Collection<String> buildPythonCommand(String path) {
        File filePath = new File(path);
        String folder = filePath.getParent();
        String run = "docker run --rm --name my-running-script -v $PWD:/app -w /app/" + folder + " python:2 python script.py";
        return Collections.singletonList(run);
    }

}
