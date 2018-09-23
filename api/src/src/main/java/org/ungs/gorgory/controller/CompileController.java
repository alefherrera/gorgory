package org.ungs.gorgory.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.CompilePayload;
import org.ungs.gorgory.bean.CompileResponse;

@RestController
public class CompileController {

    public CompileResponse compile(@RequestBody CompilePayload payload) {
        return new CompileResponse();
    }

}
