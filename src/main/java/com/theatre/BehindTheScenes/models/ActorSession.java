package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "actor_session", schema = "theatre", catalog = "")
@IdClass(ActorSessionPK.class)
public class ActorSession {
    private int actorRoleActorIdActor;
    private int actorRoleRoleIdRole;
    private int sessionIdSession;
    private ActorRole actorRole;

    @Id
    @Column(name = "Actor_Role_Actor_idActor", nullable = false)
    public int getActorRoleActorIdActor() {
        return actorRoleActorIdActor;
    }

    public void setActorRoleActorIdActor(int actorRoleActorIdActor) {
        this.actorRoleActorIdActor = actorRoleActorIdActor;
    }

    @Id
    @Column(name = "Actor_Role_Role_idRole", nullable = false)
    public int getActorRoleRoleIdRole() {
        return actorRoleRoleIdRole;
    }

    public void setActorRoleRoleIdRole(int actorRoleRoleIdRole) {
        this.actorRoleRoleIdRole = actorRoleRoleIdRole;
    }

    @Id
    @Column(name = "Session_idSession", nullable = false)
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
        ActorSession that = (ActorSession) o;
        return actorRoleActorIdActor == that.actorRoleActorIdActor && actorRoleRoleIdRole == that.actorRoleRoleIdRole && sessionIdSession == that.sessionIdSession;
    }

    @Override
    public int hashCode() {
        return Objects.hash(actorRoleActorIdActor, actorRoleRoleIdRole, sessionIdSession);
    }

    @ManyToOne
    @JoinColumns({@JoinColumn(name = "Actor_Role_Actor_idActor", referencedColumnName = "Actor_idActor", nullable = false), @JoinColumn(name = "Actor_Role_Role_idRole", referencedColumnName = "Role_idRole", nullable = false)})
    public ActorRole getActorRole() {
        return actorRole;
    }

    public void setActorRole(ActorRole actorRole) {
        this.actorRole = actorRole;
    }
}
