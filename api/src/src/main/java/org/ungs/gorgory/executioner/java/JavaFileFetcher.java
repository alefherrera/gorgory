package org.ungs.gorgory.executioner.java;

import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JavaFileFetcher implements FileFetcher {

    public List<File> getAllFilesWithExtension(String path, String extension){

        File pathFile = new File(path);

        List<File> toRet = new ArrayList<>();

        File [] files = pathFile.listFiles();

        for (File f:
             files) {
            if(f.isDirectory())
                toRet.addAll(getAllFilesWithExtension(f.getAbsolutePath(), extension));
            else if(f.getAbsolutePath().endsWith(extension))
                toRet.add(f);
        }

        return toRet;


    }

    public JavaFileToTest getFileToTest(List<File> files, String signature){

        String fileName = signature.split(":")[1] + ".java";

        File f = files.stream().filter(x -> x.getName().toLowerCase().equals(fileName.toLowerCase())).collect(Collectors.toList()).get(0);


        return new JavaFileToTest(f, signature);

    }

}
