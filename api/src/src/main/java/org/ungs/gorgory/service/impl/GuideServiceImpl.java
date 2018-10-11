package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.bean.GuideDto;
import org.ungs.gorgory.model.Argument;
import org.ungs.gorgory.model.Exercise;
import org.ungs.gorgory.model.Guide;
import org.ungs.gorgory.model.TestCase;
import org.ungs.gorgory.repository.GuideRepository;
import org.ungs.gorgory.service.GuideService;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class GuideServiceImpl implements GuideService {

    private GuideRepository guideRepository;

    public GuideServiceImpl(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
    }

    @Override
    public Guide saveNewGuide(GuideDto newGuide) {


        Guide toAdd = new Guide();

        toAdd.setName(newGuide.name);
        toAdd.setExercises(new ArrayList<>());
        toAdd.getExercises().addAll(newGuide.exercises.stream()
                .map(e -> {Exercise ne = new Exercise();
                            ne.setLanguage(e.language);
                            ne.setTestCases(e.testCases.stream().map(t ->{ TestCase nt = new TestCase();
                                                                            nt.setFunctionToTest(t.functionToTest);
                                                                            nt.setExpected(t.expected);
                                                                            nt.setArguments(t.arguments.stream().map(a -> {
                                                                                Argument na = new Argument();
                                                                                na.setValue(a);
                                                                                return na;
                                                                            }).collect(Collectors.toList()));
                                                                            return nt;
                            }).collect(Collectors.toList()));
                            return ne;})
                .collect(Collectors.toList()));

        guideRepository.save(toAdd);

        return toAdd;
    }
}
