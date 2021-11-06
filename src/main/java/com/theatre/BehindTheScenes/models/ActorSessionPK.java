package com.theatre.BehindTheScenes.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class ActorSessionPK implements Serializable {
    private int actorRoleActorIdActor;
    private int actorRoleRoleIdRole;
    private int sessionIdSession;

    @Column(name = "Actor_Role_Actor_idActor", nullable = false)
    @Id
    public int getActorRoleActorIdActor() {
        return actorRoleActorIdActor;
    }

    public void setActorRoleActorIdActor(int actorRoleActorIdActor) {
        this.actorRoleActorIdActor = actorRoleActorIdActor;
    }

    @Column(name = "Actor_Role_Role_idRole", nullable = false)
    @Id
    public int getActorRoleRoleIdRole() {
        return actorRoleRoleIdRole;
    }

    public void setActorRoleRoleIdRole(int actorRoleRoleIdRole) {
        this.actorRoleRoleIdRole = actorRoleRoleIdRole;
    }

    @Column(name = "Session_idSession", nullable = false)
    @Id
    public int getSessionIdSession() {
        return sessionIdSession;
    }

    public void setSessionIdSession(int sessionIdSession) {
        this.sessionIdSession = sessionIdSession;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ActorSessionPK that = (ActorSessionPK) o;
        return actorRoleActorIdActor == that.actorRoleActorIdActor && actorRoleRoleIdRole == that.actorRoleRoleIdRole && sessionIdSession == that.sessionIdSession;
    }

    @Override
    public int hashCode() {
        return Objects.hash(actorRoleActorIdActor, actorRoleRoleIdRole, sessionIdSession);
    }
}
