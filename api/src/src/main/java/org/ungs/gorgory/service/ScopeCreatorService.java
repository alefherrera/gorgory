package org.ungs.gorgory.service;

import org.ungs.gorgory.Language;

public interface ScopeCreatorService {

    String getPath(Language lang, String code);

    String createScope(String filename);

}
