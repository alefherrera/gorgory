package org.ungs.gorgory.service;

import org.ungs.gorgory.bean.CodeEvaluationPayload;

public interface CodeEvaluationService {

    String getStdin(CodeEvaluationPayload payload);
    boolean checkStdout(String stdout);

}
