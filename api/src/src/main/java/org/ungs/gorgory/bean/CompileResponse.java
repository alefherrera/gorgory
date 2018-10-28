package org.ungs.gorgory.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CompileResponse {

    public CompileResponse(String output, String guid) {
        this.output = output;
        this.guid = guid;
    }

    @JsonProperty("output")
    private String output;

    @JsonProperty("guid")
    private String guid;

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }
}
