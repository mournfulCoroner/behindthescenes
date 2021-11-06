package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "actor_role", schema = "theatre", catalog = "")
@IdClass(ActorRolePK.class)
public class ActorRole {
    private int actorIdActor;
    private int roleIdRole;
    private Actor actorByActorIdActor;
    private Collection<ActorSession> actorSessions;

    @Id
    @Column(name = "Actor_idActor", nullable = false)
    public int getActorIdActor() {
        return actorIdActor;
    }

    public void setActorIdActor(int actorIdActor) {
        this.actorIdActor = actorIdActor;
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
        ActorRole actorRole = (ActorRole) o;
        return actorIdActor == actorRole.actorIdActor && roleIdRole == actorRole.roleIdRole;
    }

    @Override
    public int hashCode() {
        return Objects.hash(actorIdActor, roleIdRole);
    }

    @ManyToOne
    @JoinColumn(name = "Actor_idActor", referencedColumnName = "idActor", nullable = false)
    public Actor getActorByActorIdActor() {
        return actorByActorIdActor;
    }

    public void setActorByActorIdActor(Actor actorByActorIdActor) {
        this.actorByActorIdActor = actorByActorIdActor;
    }

    @OneToMany(mappedBy = "actorRole")
    public Collection<ActorSession> getActorSessions() {
        return actorSessions;
    }

    public void setActorSessions(Collection<ActorSession> actorSessions) {
        this.actorSessions = actorSessions;
    }
}
