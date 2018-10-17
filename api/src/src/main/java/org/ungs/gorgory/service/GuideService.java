package org.ungs.gorgory.service;

import org.ungs.gorgory.model.Guide;

import java.util.List;

public interface GuideService {

    Guide save(Guide guide);

    Guide get(Long id);

    List<Guide> getAll();
}
