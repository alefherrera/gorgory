package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.service.CommandFactoryService;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service("local")
public class LocalCommandFactoryService implements CommandFactoryService {

    private final Map<String, Function<String, String>> commandMap;

    public LocalCommandFactoryService() {
        commandMap = new HashMap<>();
        commandMap.put("java", this::buildJavaCommand);
        commandMap.put("python", this::buildPythonCommand);
    }

    public String getCommand(String lang, String path) {
        return commandMap.get(lang).apply(path);
    }

    private String buildJavaCommand(String path) {
        File filePath = new File(path);
        String folder = filePath.getParent();
        return "cd $PWD/" + folder + " && javac Script.java && java Script";
    }

    private String buildPythonCommand(String path) {
        File filePath = new File(path);
        String folder = filePath.getParent();
        return "python $PWD/" + filePath;
    }
}
