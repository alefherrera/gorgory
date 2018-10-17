package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.repository.GuideRepository;
import org.ungs.gorgory.service.GuideService;

import java.util.List;

@Service
public class GuideServiceImpl implements GuideService {

    private GuideRepository guideRepository;

    public GuideServiceImpl(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
    }

    public Guide save(Guide guide) {
        return guideRepository.save(guide);
    }

    public Guide get(Long id) {
        return guideRepository.findById(id).orElse(null);
    }

    public List<Guide> getAll() {
        return guideRepository.findAll();
    }
}
