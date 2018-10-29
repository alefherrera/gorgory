package org.ungs.gorgory.service.impl;

import org.springframework.stereotype.Service;
import org.ungs.gorgory.service.CommandRunnerService;

import java.io.*;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class CommandRunnerServiceImpl implements CommandRunnerService {

    public String execute(Collection<String> command) {
        return command.stream().map(this::execute).collect(Collectors.joining(":"));
    }

    @Override
    public String executeSingleCommand(String command) {
        return execute(command);
    }

    private String execute(String command) {
        System.out.println(command);
        try {
            ProcessBuilder builder = new ProcessBuilder();
            String pwd = System.getenv("PWD");
            builder.environment().putAll(System.getenv());
            builder.command("sh", "-c", command);
            builder.directory(new File(pwd));
            Process process = builder.start();
            process.waitFor();

            String error = getString(process.getErrorStream());
            String output = getString(process.getInputStream());

            return error.isEmpty() ? output : error;

        } catch (InterruptedException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    private String getString(InputStream inputStream) throws IOException {
        BufferedReader reader =
                new BufferedReader(new InputStreamReader(inputStream));

        String line;
        StringBuilder sb = new StringBuilder();
        while ((line = reader.readLine())!= null) {
            sb.append(line).append("\n");
        }
        return sb.toString();
    }


}
