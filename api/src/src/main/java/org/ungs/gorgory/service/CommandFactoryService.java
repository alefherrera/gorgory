package org.ungs.gorgory.service;

import java.util.Collection;
import java.util.List;

public interface CommandFactoryService {

    List<String> getCommands(String lang, List<String> paths, String mainPath);

}
