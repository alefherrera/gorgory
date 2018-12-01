package org.ungs.gorgory.bean.dto.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.ungs.gorgory.bean.dto.ResolutionDTO;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ExerciseReportDTO {

    @JsonProperty("result")
    private ResolutionDTO result;

    public ResolutionDTO getResult() {
        return result;
    }

    public void setResult(ResolutionDTO result) {
        this.result = result;
    }
}
