package com.example.second;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class SecondApplication {

    public static void main(String[] args) {

        SpringApplication.run(SecondApplication.class, args);
    }

}
