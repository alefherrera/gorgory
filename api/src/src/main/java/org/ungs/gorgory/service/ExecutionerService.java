package org.ungs.gorgory.service;

import org.ungs.gorgory.exceptions.NoCodeFilesToCompileException;
import org.ungs.gorgory.exceptions.NoMainCodeFilePresentException;
import org.ungs.gorgory.model.Resolution;
import org.ungs.gorgory.model.Result;
import org.ungs.gorgory.model.TestCase;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;

public interface ExecutionerService {
    Result runTestCaseOnResolution(Resolution resolution, TestCase testCase) throws FileNotFoundException, UnsupportedEncodingException, NoCodeFilesToCompileException, NoMainCodeFilePresentException;
}
