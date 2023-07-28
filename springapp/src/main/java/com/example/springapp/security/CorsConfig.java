package com.example.springapp.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;


@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("PUT", "DELETE","GET","POST");
        
    }
    
    // @Override
    // public void addResourceHandlers(ResourceHandlerRegistry registry) {
    //     registry
    //       .addResourceHandler("/image/**")
    //       .addResourceLocations("file:/home/coder/project/workspace/springapp/src/main/resources/static/");	
    // }
}