package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.bean.CompilePayload;
import org.ungs.gorgory.service.CommandFactoryService;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class CommandFactoryServiceImpl implements CommandFactoryService {

    private final Map<String, Function<String, String>> commandMap;

    public CommandFactoryServiceImpl() {
        commandMap = new HashMap<>();
        commandMap.put("java", this::buildJavaCommand);
        commandMap.put("python", this::buildPythonCommand);
    }

    public String getCommand(String lang, String path) {
        String command = commandMap.get(lang).apply(path);
        return command;
    }

    private String buildJavaCommand(String path) {
        File filePath = new File(path);
        String folder = filePath.getParent();
        String command = "docker run --rm -v $PWD:/app -w /app/" + folder + " openjdk:8-alpine javac Script.java && java Script";
        return command;
    }

    private String buildPythonCommand(String path) {
        File filePath = new File(path);
        String folder = filePath.getParent();
        String command = "docker run -it --rm --name my-running-script -v $PWD:/app -w /app/" + folder + " python:2 python script.py";
//        String command = "docker run -it --rm --name my-running-script -v $PWD:/app -w /app/" + folder + " python:2 ls";
        return command;
    }
}
