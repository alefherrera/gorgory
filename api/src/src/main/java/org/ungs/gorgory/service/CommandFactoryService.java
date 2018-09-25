package org.ungs.gorgory.service;

import java.util.Collection;

public interface CommandFactoryService {

    Collection<String> getCommands(String lang, String path);

}
