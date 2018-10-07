package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.Language;
import org.ungs.gorgory.service.CommandFactoryService;

import java.io.File;
import java.util.*;
import java.util.function.Function;

@Service("local")
public class LocalCommandFactoryService implements CommandFactoryService {

    private final Map<Language, Function<String, Collection<String>>> commandMap;

    public LocalCommandFactoryService() {
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
        String compile = "cd $PWD/" + folder + " && javac Script.java";
        String run = "cd $PWD/" + folder + " && java Script";
        return Arrays.asList(compile, run);
    }

    private Collection<String> buildPythonCommand(String path) {
        File filePath = new File(path);
        String run = "python " + filePath;
        return Collections.singletonList(run);
    }

}
