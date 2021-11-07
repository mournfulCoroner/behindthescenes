package com.theatre.BehindTheScenes.config;

import com.theatre.BehindTheScenes.models.User;
import com.theatre.BehindTheScenes.services.DetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    final DetailsService detailsService;

    @Autowired
    public WebSecurityConfig(DetailsService detailsService) {
        this.detailsService = detailsService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(detailsService).passwordEncoder(User.PASSWORD_ENCODER);
    }

    /**
     * по url: "/clients", "posts/likes/**", "posts/comments/create_comment", "posts/comments/create_answer"
     * может перйти только авторизованный пользователь
     * и для авторизации используется базовая авторизация
     * и блокировать csrf
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/actors").authenticated()
                .and()
                .httpBasic()
                .and()
                .csrf().disable();
    }
}
