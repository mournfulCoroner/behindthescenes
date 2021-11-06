package com.theatre.BehindTheScenes.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class ReplicPK implements Serializable {
    private int replicNumber;
    private int roleIdRole;

    @Column(name = "replicNumber", nullable = false)
    @Id
    public int getReplicNumber() {
        return replicNumber;
    }

    public void setReplicNumber(int replicNumber) {
        this.replicNumber = replicNumber;
    }

    @Column(name = "Role_idRole", nullable = false)
    @Id
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
        ReplicPK replicPK = (ReplicPK) o;
        return replicNumber == replicPK.replicNumber && roleIdRole == replicPK.roleIdRole;
    }

    @Override
    public int hashCode() {
        return Objects.hash(replicNumber, roleIdRole);
    }
}
