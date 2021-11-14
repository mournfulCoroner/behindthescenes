package com.theatre.BehindTheScenes.model;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class User {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    private String nickname;
    private String password;
    private String encodePassword;
    private int id;

    public User() {
        super();
    }

    public User(String nickname, String password, String encodePassword) {
        this.nickname = nickname;
        this.password = password;
        this.encodePassword = encodePassword;
    }
    @Basic
    @Column(name = "nickname", nullable = false, length = 32)
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "password", nullable = false, length = 45)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "encode_password", nullable = false, length = 100)
    public String getEncodePassword() {
        return encodePassword;
    }

    public void setEncodePassword(String encodePassword) {
        this.encodePassword = encodePassword;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (id != user.id) return false;
        if (nickname != null ? !nickname.equals(user.nickname) : user.nickname != null) return false;
        if (password != null ? !password.equals(user.password) : user.password != null) return false;
        if (encodePassword != null ? !encodePassword.equals(user.encodePassword) : user.encodePassword != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = nickname != null ? nickname.hashCode() : 0;
        result = 31 * result + id;
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (encodePassword != null ? encodePassword.hashCode() : 0);
        return result;
    }

}