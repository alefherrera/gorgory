package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReportTotalsDTO {

    @JsonProperty("done")
    private Integer done;

    @JsonProperty("error")
    private Integer error;

    @JsonProperty("unknown")
    private Integer unknown;

    public Integer getDone() {
        return done;
    }

    public void setDone(Integer done) {
        this.done = done;
    }

    public Integer getError() {
        return error;
    }

    public void setError(Integer error) {
        this.error = error;
    }

    public Integer getUnknown() {
        return unknown;
    }

    public void setUnknown(Integer unknown) {
        this.unknown = unknown;
    }
}
