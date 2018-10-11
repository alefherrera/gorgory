package org.ungs.gorgory.service;

import org.ungs.gorgory.bean.GuideDto;
import org.ungs.gorgory.model.Guide;

public interface GuideService {

    Guide saveNewGuide(GuideDto newGuide);


}
