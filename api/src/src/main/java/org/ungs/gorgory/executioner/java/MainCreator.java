package org.ungs.gorgory.executioner.java;

import org.ungs.gorgory.model.Argument;

import java.io.File;
import java.util.Collection;

public interface MainCreator {
    File createMain(String parentPath, String nameOfTestCase, JavaFileToTest toTest, Collection<Argument> arguments);
}
