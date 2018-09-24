package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
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

    private final Map<String, String> fileNameMap;

    public ScopeCreatorServiceImpl() {
        this.fileNameMap = new HashMap<>();
        fileNameMap.put("java", "Script.java");
        fileNameMap.put("python", "script.py");
    }

    public String getPath(String lang, String code) {

        String fileName = fileNameMap.get(lang);
        String uuid = UUID.randomUUID().toString();
        String fullPath = "scope/" + uuid + "/" + fileName;

        File file = new File(fullPath);
        file.getParentFile().mkdirs();

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
}
