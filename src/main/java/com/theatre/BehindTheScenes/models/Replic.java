package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@IdClass(ReplicPK.class)
public class Replic {
    private String text;
    private int replicNumber;
    private int roleIdRole;

    @Basic
    @Column(name = "text", nullable = false, length = 300)
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Id
    @Column(name = "replicNumber", nullable = false)
    public int getReplicNumber() {
        return replicNumber;
    }

    public void setReplicNumber(int replicNumber) {
        this.replicNumber = replicNumber;
    }

    @Id
    @Column(name = "Role_idRole", nullable = false)
    public int getRoleIdRole() {
        return roleIdRole;
    }

    public void setRoleIdRole(int roleIdRole) {
        this.roleIdRole = roleIdRole;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Replic replic = (Replic) o;
        return replicNumber == replic.replicNumber && roleIdRole == replic.roleIdRole && Objects.equals(text, replic.text);
    }

    @Override
    public int hashCode() {
        return Objects.hash(text, replicNumber, roleIdRole);
    }
}
