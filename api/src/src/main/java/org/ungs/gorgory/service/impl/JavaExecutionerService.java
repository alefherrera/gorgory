package org.ungs.gorgory.service.impl;


import org.springframework.stereotype.Service;
import org.ungs.gorgory.exceptions.NoCodeFilesToCompileException;
import org.ungs.gorgory.exceptions.NoMainCodeFilePresentException;
import org.ungs.gorgory.executioner.java.JavaExecutioner;
import org.ungs.gorgory.executioner.java.JavaExecutionerResult;
import org.ungs.gorgory.model.Resolution;
import org.ungs.gorgory.model.Result;
import org.ungs.gorgory.enums.ResultState;
import org.ungs.gorgory.model.TestCase;
import org.ungs.gorgory.repository.ResolutionRepository;
import org.ungs.gorgory.service.ExecutionerService;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

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
        JavaExecutionerResult output = javaExecutioner.execute(resolution.getPath(), testCase);

        //TODO: que diseño feo. by leafunes
        if(output.isCompilationError()){
            result.setState(ResultState.COMPILATION_ERROR);
        }else{
            if(testCase.getExpected().equals(output.getOputput()))
                result.setState(ResultState.PASSED);
            else
                result.setState(ResultState.RUNTIME_ERROR);
        }

        result.setOutput(output.getOputput());
        result.setResolution(resolution);
        result.setTestCase(testCase);

        if(resolution.getResults() == null)
            resolution.setResults(new ArrayList<>());

        resolution.getResults().add(result);

        return result;

    }
}
