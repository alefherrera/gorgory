package org.ungs.gorgory.service;

public interface ScopeCreatorService {

    String getPath(String lang, String code);

    String createScope(String filename);

}
