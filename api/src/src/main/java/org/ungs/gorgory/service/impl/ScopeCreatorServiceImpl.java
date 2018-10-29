package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.Language;
import org.ungs.gorgory.service.ScopeCreatorService;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ScopeCreatorServiceImpl implements ScopeCreatorService {

    private static final String SCOPE_BASE = "scope";
    private final Map<Language, String> fileNameMap;

    public ScopeCreatorServiceImpl() {
        this.fileNameMap = new HashMap<>();
        fileNameMap.put(Language.JAVA, "Script.java");
        fileNameMap.put(Language.PYTHON, "script.py");
    }

    public String createScope(String filename) {
        String newScope = getNewScope();
        String dirPath = SCOPE_BASE + File.separator + newScope + File.separator + filename;
        createScopeFolder(dirPath);
        return dirPath;
    }

    public String getPath(Language lang, String code) {

        String fileName = fileNameMap.get(lang);
        String uuid = getNewScope();
        String fullPath = SCOPE_BASE +  File.separator + uuid +  File.separator + fileName;

        File file = createScopeFolder(fullPath);

        try {
            file.createNewFile();
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(fullPath, true));
            bufferedWriter.write(code);
            bufferedWriter.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return fullPath;
    }

    private File createScopeFolder(String fullPath) {
        File file = new File(fullPath);
        file.getParentFile().mkdirs();
        return file;
    }

    private String getNewScope() {
        return UUID.randomUUID().toString();
    }
}
