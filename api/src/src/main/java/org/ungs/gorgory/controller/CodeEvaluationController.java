package org.ungs.gorgory.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.ungs.gorgory.bean.CodeEvaluationPayload;
import org.ungs.gorgory.executioner.java.JavaExecutioner;
import org.ungs.gorgory.model.Argument;
import org.ungs.gorgory.model.TestCase;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CodeEvaluationController {

    private JavaExecutioner javaExecutioner;

    public CodeEvaluationController(JavaExecutioner javaExecutioner) {
        this.javaExecutioner = javaExecutioner;
    }

    @PostMapping("/test/{guid}")
    public void test(@PathVariable String guid, @RequestBody CodeEvaluationPayload input) {


        TestCase t = new TestCase();
        t.setExpected("12");
        t.setSignature("int;sumar;int;int:Sumador");
        List<Argument> args = new ArrayList<>();

        Argument a1 = new Argument();
        a1.setValue("10");
        Argument a2 = new Argument();
        a2.setValue("12");

        args.add(a1);
        args.add(a2);

        t.setArguments(args);

        javaExecutioner.execute("/scope/javatest", t);



    }

}
