package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.bean.dto.report.GuideReportDTO;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.model.User;
import org.ungs.gorgory.repository.GuideRepository;
import org.ungs.gorgory.repository.UserRepository;
import org.ungs.gorgory.service.GuideService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GuideServiceImpl implements GuideService {

    private GuideRepository guideRepository;
    private UserRepository userRepository;

    public GuideServiceImpl(GuideRepository guideRepository, UserRepository userRepository) {
        this.guideRepository = guideRepository;
        this.userRepository = userRepository;
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

    public List<Guide> getByQuery(String query) {
        return getVisibleGuides(guideRepository.findAllByNameContaining(query));
    }

    private List<Guide> getVisibleGuides(List<Guide> guides) {

        LocalDateTime now = LocalDateTime.now();

        return guides.stream().filter(x -> x.getStart() == null || x.getStart().isBefore(now)).collect(Collectors.toList());

    }

    public Long delete(Long id) {
        guideRepository.deleteById(id);
        return id;
    }

    @Override
    public List<Guide> getActiveGuidesForUser(User user) {
        LocalDateTime now = LocalDateTime.now();
        return guideRepository.findAllByStartBeforeAndEndAfterAndCoursesIn(now, now, user.getLearningCourses());
    }

    @Override
    public GuideReportDTO getGuideReport(Long id) {

        GuideReportDTO result = new GuideReportDTO();
        Guide guide = guideRepository.findById(id).orElse(null);

        GuideReportDTO.CourseReportDTO
        result.getCourse() guide.getCourses();






        return null;
    }

}
