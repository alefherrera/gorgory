package org.ungs.gorgory.service;

public interface CommandFactoryService {

    String getCompileCommand(String lang, String path);

    String getLinkCommand(String folder);
    String getExecuteCommand(String folder, String stdin);

}
