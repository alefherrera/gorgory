package org.ungs.gorgory.bean;

public class ScopePath {

    private String guid;
    private String path;

    public ScopePath(String guid, String path) {
        this.guid = guid;
        this.path = path;
    }

    public String getGuid() {
        return guid;
    }

    public String getPath() {
        return path;
    }
}
