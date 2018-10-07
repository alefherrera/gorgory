package org.ungs.gorgory.service;

import java.util.Collection;
import java.util.List;

public interface CommandFactoryService {

    //Habria que separarlos a los comandos >:|
    List<String> getCommands(String lang, List<String> files, String mainPath);

}
