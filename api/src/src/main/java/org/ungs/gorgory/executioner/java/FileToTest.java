package org.ungs.gorgory.executioner.java;

import java.io.File;
import java.util.List;

public interface FileToTest {
    String getCallStatement(List<String> params);

    String getImportStatment();

    String getPrintStatment();

    String getNewStatment();

    File getToTest();
}
