package org.ungs.gorgory.executioner.java;

import java.io.File;
import java.util.List;

public interface FileFetcher {

    List<File> getAllFilesWithExtension(String path, String extension);

    JavaFileToTest getFileToTest(List<File> files, String signature);



}
