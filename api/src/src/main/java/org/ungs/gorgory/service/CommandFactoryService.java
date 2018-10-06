package org.ungs.gorgory.service;

import org.ungs.gorgory.Language;

import java.util.Collection;

public interface CommandFactoryService {

    Collection<String> getCommands(Language lang, String path);

}
