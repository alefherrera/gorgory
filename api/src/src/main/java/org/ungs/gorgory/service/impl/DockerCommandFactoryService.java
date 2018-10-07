package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.service.CommandFactoryService;

import java.io.File;
import java.util.*;
import java.util.function.BiFunction;
import java.util.function.Function;

@Service("docker")
public class DockerCommandFactoryService implements CommandFactoryService {

    private final Map<String, BiFunction<List<String>, String, List<String>>> commandMap;

    public DockerCommandFactoryService() {
        commandMap = new HashMap<>();
        commandMap.put("java", this::buildJavaCommand);
        commandMap.put("python", this::buildPythonCommand);
    }

    public List<String> getCommands(String lang, List<String> path, String mainPath) {
        return commandMap.get(lang).apply(path, mainPath);
    }

    private List<String> buildJavaCommand(List<String> path, String mainPath) {
        File filePath = new File(path.get(0));
        String folder = filePath.getParent();
        String dockerCommand = getDockerCommand(folder);


        String compile = dockerCommand + " openjdk:8-alpine javac ";
        for (String javaFile : path){
            compile += javaFile + " ";
        }
        String run = dockerCommand + " openjdk:8-alpine java " + mainPath;
        return Arrays.asList(compile, run);
    }

    private List<String> buildPythonCommand(List<String> path, String mainPath) {
        File filePath = new File(path.get(0));
        String folder = filePath.getParent();
        String run = getDockerCommand(folder) + " python:2-alpine python script.py";
        return Collections.singletonList(run);
    }

    private String getDockerCommand(String folder) {
        return "docker run --rm -v $PWD:/app -w /app/" + folder;
    }

}
