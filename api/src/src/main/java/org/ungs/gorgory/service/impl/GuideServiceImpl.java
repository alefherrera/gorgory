package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.repository.GuideRepository;
import org.ungs.gorgory.service.GuideService;

@Service
public class GuideServiceImpl implements GuideService {

    private GuideRepository guideRepository;

    public GuideServiceImpl(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
    }

    public Guide save(Guide guide) {
        return guideRepository.save(guide);
    }
}
