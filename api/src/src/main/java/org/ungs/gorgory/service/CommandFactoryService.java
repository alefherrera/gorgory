package org.ungs.gorgory.service;

import org.ungs.gorgory.Language;
import java.util.List;

public interface CommandFactoryService {

    List<String> getCommands(Language lang, String path);

}
