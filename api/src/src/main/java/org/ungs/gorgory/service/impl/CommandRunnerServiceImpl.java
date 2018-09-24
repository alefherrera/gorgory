package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.service.CommandRunnerService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class CommandRunnerServiceImpl implements CommandRunnerService {

    public String execute(String command) {
        System.out.println(command);
        try {
            Process process = Runtime.getRuntime().exec(command);
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
