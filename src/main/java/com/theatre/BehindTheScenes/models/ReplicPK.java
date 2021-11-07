package com.theatre.BehindTheScenes.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

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

        if (replicNumber != replicPK.replicNumber) return false;
        if (roleIdRole != replicPK.roleIdRole) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = replicNumber;
        result = 31 * result + roleIdRole;
        return result;
    }
}
