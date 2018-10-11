package org.ungs.gorgory.service.impl;


import org.springframework.stereotype.Service;
import org.ungs.gorgory.exceptions.NoCodeFilesToCompileException;
import org.ungs.gorgory.exceptions.NoMainCodeFilePresentException;
import org.ungs.gorgory.executioner.java.JavaExecutioner;
import org.ungs.gorgory.model.Resolution;
import org.ungs.gorgory.model.Result;
import org.ungs.gorgory.model.TestCase;
import org.ungs.gorgory.repository.ResolutionRepository;
import org.ungs.gorgory.service.ExecutionerService;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Service
public class JavaExecutionerService implements ExecutionerService {


    private JavaExecutioner javaExecutioner;
    private ResolutionRepository resolutionRepository;

    public JavaExecutionerService(JavaExecutioner javaExecutioner, ResolutionRepository resolutionRepository) {
        this.javaExecutioner = javaExecutioner;
        this.resolutionRepository = resolutionRepository;
    }

    @Override
    public Result runTestCaseOnResolution(Resolution resolution, TestCase testCase) throws FileNotFoundException, UnsupportedEncodingException, NoCodeFilesToCompileException, NoMainCodeFilePresentException {

        Result result = new Result();

        String output = javaExecutioner.execute(resolution.getPath(), testCase);

        boolean passed = testCase.getExpected().equals(output);
        result.setPassed(passed);
        result.setOutput(output);
        result.setResolution(resolution);
        result.setTestCase(testCase);

        if(resolution.getResults() == null)
            resolution.setResults(new ArrayList<>());

        resolution.getResults().add(result);

        return result;

    }
}
