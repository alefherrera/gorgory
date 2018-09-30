package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.bean.CodeEvaluationPayload;
import org.ungs.gorgory.bean.InputOutputPair;
import org.ungs.gorgory.service.CodeEvaluationService;

import java.util.stream.Collectors;

@Service
public class CodeEvaluationServiceImpl implements CodeEvaluationService {

    @Override
    public String getStdin(CodeEvaluationPayload payload) {

        StringBuilder sb = new StringBuilder();

        for(InputOutputPair pair : payload.getTestCases()){

            String params = pair.getInputParameters().stream()
                    .map(String::toUpperCase)
                    .collect(Collectors.joining(" "));

            sb.append(params);
            sb.append(" ");
            sb.append(pair.getExpectedOutput());
            sb.append("\n");
        }

        return sb.toString();

    }

    @Override
    public boolean checkStdout(String stdout) {

        return stdout.isEmpty();

    }


}
