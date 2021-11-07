package com.theatre.BehindTheScenes.models;

import javax.persistence.*;

@Entity
@Table(name = "actor_session", schema = "theatre", catalog = "")
@IdClass(ActorSessionPK.class)
public class ActorSession {
    private int actorRoleActorIdActor;
    private int actorRoleRoleIdRole;
    private int sessionIdSession;
    private ActorRole actorRole;
    private Session sessionBySessionIdSession;

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

        if (actorRoleActorIdActor != that.actorRoleActorIdActor) return false;
        if (actorRoleRoleIdRole != that.actorRoleRoleIdRole) return false;
        if (sessionIdSession != that.sessionIdSession) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = actorRoleActorIdActor;
        result = 31 * result + actorRoleRoleIdRole;
        result = 31 * result + sessionIdSession;
        return result;
    }

    @ManyToOne
    @JoinColumns({@JoinColumn(name = "Actor_Role_Actor_idActor", referencedColumnName = "Actor_idActor", nullable = false, insertable = false, updatable = false),
            @JoinColumn(name = "Actor_Role_Role_idRole", referencedColumnName = "Role_idRole", nullable = false, insertable = false, updatable = false)})
    public ActorRole getActorRole() {
        return actorRole;
    }

    public void setActorRole(ActorRole actorRole) {
        this.actorRole = actorRole;
    }

    @ManyToOne
    @JoinColumn(name = "Session_idSession", referencedColumnName = "idSession", nullable = false , insertable = false, updatable = false)
    public Session getSessionBySessionIdSession() {
        return sessionBySessionIdSession;
    }

    public void setSessionBySessionIdSession(Session sessionBySessionIdSession) {
        this.sessionBySessionIdSession = sessionBySessionIdSession;
    }
}
