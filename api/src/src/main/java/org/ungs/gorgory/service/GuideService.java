package org.ungs.gorgory.service;

import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.model.User;

import java.util.List;

public interface GuideService {

    Guide save(Guide guide);

    Guide get(Long id);

    List<Guide> getAll();

    List<Guide> getByQuery(String query);

    Long delete(Long id);

    List<Guide> getActiveGuidesForUser(User user);
}
