package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.service.CommandRunnerService;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class CommandRunnerServiceImpl implements CommandRunnerService {

    public String execute(String command) {
        System.out.println(command);
        try {
            ProcessBuilder builder = new ProcessBuilder();
            String pwd = System.getenv("PWD");
            builder.environment().putAll(System.getenv());
            builder.command("sh", "-c", command);
            builder.directory(new File(pwd));
            Process process = builder.start();
            process.waitFor();

            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(process.getInputStream()));

            String line = "";
            StringBuilder sb = new StringBuilder();
            while ((line = reader.readLine())!= null) {
                sb.append(line + "\n");
            }
            return sb.toString();
        } catch (InterruptedException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}
