package org.ungs.gorgory;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.NamingConventions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class GorgoryApplication {

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(GorgoryApplication.class);
        application.setAdditionalProfiles("dev");
        application.run(args);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper toRet = new ModelMapper();

        toRet.getConfiguration()
                .setFieldMatchingEnabled(true)
      .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
      .setSourceNamingConvention(NamingConventions.JAVABEANS_MUTATOR);

        return toRet;
    }

}
