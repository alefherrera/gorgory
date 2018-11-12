package org.ungs.gorgory.service;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.ungs.gorgory.enums.ResultState;
import org.ungs.gorgory.exceptions.NoCodeFilesToCompileException;
import org.ungs.gorgory.exceptions.NoMainCodeFilePresentException;
import org.ungs.gorgory.model.*;
import org.ungs.gorgory.service.impl.CommandRunnerServiceImpl;
import org.ungs.gorgory.service.impl.LocalCommandFactoryService;
import org.ungs.gorgory.service.impl.PythonExecutionerService;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;

public class PythonExecutionerServiceTest {

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void runTestCaseOnResolution_BasicPythonProgram() throws FileNotFoundException, UnsupportedEncodingException, NoCodeFilesToCompileException, NoMainCodeFilePresentException {
        CommandFactoryService commandFactoryService = new LocalCommandFactoryService();
        CommandRunnerService commandRunnerService = new CommandRunnerServiceImpl();

        PythonExecutionerService service = new PythonExecutionerService(commandFactoryService, commandRunnerService);

        Path currentRelativePath = Paths.get("src/test/java/org/ungs/gorgory/service/test_data/resolution1");
        Resolution resolution = new Resolution();
        resolution.setPath(currentRelativePath.toAbsolutePath().toString());

        TestCase testCase = new TestCase();
        testCase.setArguments(Collections.EMPTY_LIST);
        testCase.setExpected("Hello world!\n");

        Result result = service.runTestCaseOnResolution(resolution, testCase);

        Assert.assertNotNull(result);
        Assert.assertEquals(ResultState.PASSED, result.getState());
    }

    @Test(expected = NoCodeFilesToCompileException.class)
    public void runTestCaseOnResolution_NoCodeFiles() throws FileNotFoundException, UnsupportedEncodingException, NoCodeFilesToCompileException, NoMainCodeFilePresentException {
        CommandFactoryService commandFactoryService = new LocalCommandFactoryService();
        CommandRunnerService commandRunnerService = new CommandRunnerServiceImpl();

        PythonExecutionerService service = new PythonExecutionerService(commandFactoryService, commandRunnerService);

        Path currentRelativePath = Paths.get("src/test/java/org/ungs/gorgory/service/test_data/resolution2");
        Resolution resolution = new Resolution();
        resolution.setPath(currentRelativePath.toAbsolutePath().toString());

        TestCase testCase = new TestCase();
        testCase.setArguments(Collections.EMPTY_LIST);
        testCase.setExpected("");

        Result result = service.runTestCaseOnResolution(resolution, testCase);
    }

    @Test()
    public void runTestCaseOnResolution_MultipleCodeFiles() throws FileNotFoundException, UnsupportedEncodingException, NoCodeFilesToCompileException, NoMainCodeFilePresentException {
        CommandFactoryService commandFactoryService = new LocalCommandFactoryService();
        CommandRunnerService commandRunnerService = new CommandRunnerServiceImpl();

        PythonExecutionerService service = new PythonExecutionerService(commandFactoryService, commandRunnerService);

        Path currentRelativePath = Paths.get("src/test/java/org/ungs/gorgory/service/test_data/resolution3");
        Resolution resolution = new Resolution();
        resolution.setPath(currentRelativePath.toAbsolutePath().toString());

        TestCase testCase = new TestCase();
        testCase.setArguments(Collections.EMPTY_LIST);
        testCase.setExpected("Result: 101\n");

        Result result = service.runTestCaseOnResolution(resolution, testCase);

        Assert.assertNotNull(result);
        Assert.assertEquals(ResultState.PASSED, result.getState());
    }

    @Test()
    public void runTestCaseOnResolution_CodeFilesWithInput() throws FileNotFoundException, UnsupportedEncodingException, NoCodeFilesToCompileException, NoMainCodeFilePresentException {
        CommandFactoryService commandFactoryService = new LocalCommandFactoryService();
        CommandRunnerService commandRunnerService = new CommandRunnerServiceImpl();

        PythonExecutionerService service = new PythonExecutionerService(commandFactoryService, commandRunnerService);

        Path currentRelativePath = Paths.get("src/test/java/org/ungs/gorgory/service/test_data/resolution4");
        Resolution resolution = new Resolution();
        resolution.setPath(currentRelativePath.toAbsolutePath().toString());

        Argument argument = new Argument();
        argument.setValue("test");
        TestCase testCase = new TestCase();
        testCase.setArguments(new ArrayList<>());
        testCase.getArguments().add(argument);
        testCase.setExpected("Hello test\n");

        Result result = service.runTestCaseOnResolution(resolution, testCase);

        Assert.assertNotNull(result);
        Assert.assertEquals(ResultState.PASSED, result.getState());
    }

    @Test(expected = NoMainCodeFilePresentException.class)
    public void runTestCaseOnResolution_NoMainCodeFile() throws FileNotFoundException, UnsupportedEncodingException, NoCodeFilesToCompileException, NoMainCodeFilePresentException {

        CommandFactoryService commandFactoryService = new LocalCommandFactoryService();
        CommandRunnerService commandRunnerService = new CommandRunnerServiceImpl();

        PythonExecutionerService service = new PythonExecutionerService(commandFactoryService, commandRunnerService);

        Path currentRelativePath = Paths.get("src/test/java/org/ungs/gorgory/service/test_data/resolution5");
        Resolution resolution = new Resolution();
        resolution.setPath(currentRelativePath.toAbsolutePath().toString());

        TestCase testCase = new TestCase();
        testCase.setArguments(Collections.EMPTY_LIST);
        testCase.setExpected("");

        service.runTestCaseOnResolution(resolution, testCase);
    }

}
