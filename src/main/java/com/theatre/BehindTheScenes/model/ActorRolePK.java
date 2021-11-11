package com.theatre.BehindTheScenes.model;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class ActorRolePK implements Serializable {
    private int actorIdActor;
    private int roleIdRole;

    @Column(name = "Actor_idActor", nullable = false)
    @Id
    public int getActorIdActor() {
        return actorIdActor;
    }

    public void setActorIdActor(int actorIdActor) {
        this.actorIdActor = actorIdActor;
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

        ActorRolePK that = (ActorRolePK) o;

        if (actorIdActor != that.actorIdActor) return false;
        if (roleIdRole != that.roleIdRole) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = actorIdActor;
        result = 31 * result + roleIdRole;
        return result;
    }
}
