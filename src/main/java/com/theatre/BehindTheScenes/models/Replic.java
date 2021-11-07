package com.theatre.BehindTheScenes.models;

import javax.persistence.*;

@Entity
@IdClass(ReplicPK.class)
public class Replic {
    private String text;
    private int replicNumber;
    private int roleIdRole;
    private Role roleByRoleIdRole;

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

        if (replicNumber != replic.replicNumber) return false;
        if (roleIdRole != replic.roleIdRole) return false;
        if (text != null ? !text.equals(replic.text) : replic.text != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = text != null ? text.hashCode() : 0;
        result = 31 * result + replicNumber;
        result = 31 * result + roleIdRole;
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "Role_idRole", referencedColumnName = "idRole", nullable = false, insertable = false, updatable = false)
    public Role getRoleByRoleIdRole() {
        return roleByRoleIdRole;
    }

    public void setRoleByRoleIdRole(Role roleByRoleIdRole) {
        this.roleByRoleIdRole = roleByRoleIdRole;
    }
}
