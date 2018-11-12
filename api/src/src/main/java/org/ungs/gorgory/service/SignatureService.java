package org.ungs.gorgory.service;

import org.ungs.gorgory.model.Signature;

import java.util.List;

public interface SignatureService {

    void save(Signature signature);

    Signature get(Long id);

    List<Signature> getAll();

    Long delete(Long id);

}
