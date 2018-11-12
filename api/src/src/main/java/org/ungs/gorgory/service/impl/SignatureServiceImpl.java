package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.model.Signature;
import org.ungs.gorgory.repository.SignatureRepository;
import org.ungs.gorgory.service.SignatureService;

import java.util.List;

@Service
public class SignatureServiceImpl implements SignatureService {

    private final SignatureRepository signatureRepository;

    public SignatureServiceImpl(SignatureRepository signatureRepository) {
        this.signatureRepository = signatureRepository;
    }

    public void save(Signature signature) {
        signatureRepository.save(signature);
    }

    public Signature get(Long id) {
        return signatureRepository.findById(id).orElse(null);
    }

    public List<Signature> getAll() {
        return signatureRepository.findAll();
    }

    public Long delete(Long id) {
        signatureRepository.deleteById(id);
        return id;
    }
}
