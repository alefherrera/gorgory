package org.ungs.gorgory.executioner.java;

import java.io.*;
import java.util.List;

public class JavaFileToTest implements FileToTest {


    private File toTest;
    private String signature;

    public JavaFileToTest(File toTest, String signature) {
        this.toTest = toTest;
        this.signature = signature;
    }

    @Override
    public String getCallStatement(List<String> params){

        String[] funcSplit = signature.split(":")[0].split(";");
        String call = funcSplit[0] + " result = " + "objectToTest." + funcSplit[1] + "(";

        for(int i = 2; i < funcSplit.length; i++){
            call += params.get(i - 2);

            if(i < funcSplit.length - 1){
                call += ", ";
            }
        }

        call += ");";

        return call;


    }

    @Override
    public String getImportStatment(){

        try {
            BufferedReader reader = new BufferedReader(new FileReader(toTest));
            String packageStr = reader.readLine();
            String importStatment = "import " + packageStr.split(" ")[1].replace(";", "") +".*;";
            reader.close();

            return importStatment;

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    @Override
    public String getPrintStatment(){


        return "System.out.println(result);";


    }

    @Override
    public String getNewStatment(){

        String className = signature.split(":")[1];
        return className + " objectToTest = new " + className + "();";

    }

    @Override
    public File getToTest() {
        return toTest;
    }

    private String getConvertStatment(String type, String param){

        if(type == "int")
            return "Integer.parseInt("+ param +")";
        else
            return param;


    }
}
