package org.ungs.gorgory.executioner.java;

public class JavaExecutionerResult {

    private String oputput;
    private boolean compilationError;

    public String getOputput() {
        return oputput;
    }

    public void setOputput(String oputput) {
        this.oputput = oputput;
    }

    public boolean isCompilationError() {
        return compilationError;
    }

    public void setCompilationError(boolean compilationError) {
        this.compilationError = compilationError;
    }
}
