package org.ungs.gorgory.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.CodeEvaluationPayload;

@RestController
public class CodeEvaluationController {

    @PostMapping("/test/{guid}")
    public void test(@PathVariable String guid, @RequestBody CodeEvaluationPayload input) {
        //llamar al service para ejecutar en un ejercicio en particular.
    }

}
