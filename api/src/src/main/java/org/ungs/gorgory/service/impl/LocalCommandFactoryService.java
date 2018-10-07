package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.service.CommandFactoryService;

import java.io.File;
import java.util.*;
import java.util.function.BiFunction;
import java.util.function.Function;

@Service("local")
public class LocalCommandFactoryService implements CommandFactoryService {

    private final Map<String, BiFunction<List<String>, String, List<String>>> commandMap;

    public LocalCommandFactoryService() {
        commandMap = new HashMap<>();
        commandMap.put("java", this::buildJavaCommand);
        commandMap.put("python", this::buildPythonCommand);
    }

    public List<String> getCommands(String lang, List<String> path, String mainPath) {
        return commandMap.get(lang).apply(path, mainPath);
    }

    private List<String>  buildJavaCommand(List<String> path, String mainPath) {
        File filePath = new File(path.get(0));
        String folder = filePath.getParent();

        String compile = "cd $PWD/" + folder + " && javac ";

        for (String javaFile : path){
            compile += javaFile + " ";
        }
        String run = "cd $PWD/" + folder + " && java " + mainPath;

        return Arrays.asList(compile, run);
    }

    private List<String> buildPythonCommand(List<String> path, String mainPath) {
        File filePath = new File(path.get(0));
        String run = "python $PWD/" + filePath;
        return Collections.singletonList(run);
    }

}
