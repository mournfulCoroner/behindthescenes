package com.theatre.BehindTheScenes.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Authority implements GrantedAuthority {
    private int id;
    private String authority;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "authority", nullable = false, length = 45)
    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Authority authority1 = (Authority) o;

        if (id != authority1.id) return false;
        if (authority != null ? !authority.equals(authority1.authority) : authority1.authority != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (authority != null ? authority.hashCode() : 0);
        return result;
    }
}
