package org.ungs.gorgory.service;

import org.ungs.gorgory.model.ScopePath;

public interface ScopeCreatorService {

    ScopePath getPath(String lang, String code);

}
