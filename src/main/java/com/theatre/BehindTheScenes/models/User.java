package com.theatre.BehindTheScenes.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
public class User {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    private String nickname;
    private String password;
    private String encodePassword;
    private String[] roles = new String[] {"ROLE_USER"};
    private int id;

    public User() {
        super();
    }

    public User(String nickname, String password) {
        this.nickname = nickname;
        setPassword(password);
        setEncodePassword(password);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "nickname", nullable = true)
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public String getEncodePassword() {
        return encodePassword;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEncodePassword(String password) {
        this.encodePassword = PASSWORD_ENCODER.encode(password);
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }
}