package org.ungs.gorgory.executioner.java;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.model.Argument;

import java.io.*;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JavaMainCreator implements MainCreator {



    @Override
    public File createMain(String nameOfTestCase, JavaFileToTest toTest, Collection<Argument> arguments){
        String mainInString = toTest.getImportStatment();

        mainInString += "public class " + nameOfTestCase + "{ public static void main(String[] args){";
        mainInString += toTest.getNewStatment();

        List<String> argumentsStr = arguments.stream().map(x -> x.getValue()).collect(Collectors.toList());

        mainInString += toTest.getCallStatement(argumentsStr);

        mainInString += toTest.getPrintStatment();

        mainInString += "}}";

        File main = new File(toTest.getToTest().getParent() + File.separator + nameOfTestCase + ".java");


        try {
            main.delete();
            main.createNewFile();
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(main.getAbsolutePath(), true));
            bufferedWriter.write(mainInString);
            bufferedWriter.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return main;
    }


}
