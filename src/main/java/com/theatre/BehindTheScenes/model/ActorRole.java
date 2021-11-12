package com.theatre.BehindTheScenes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "actor_role", schema = "theatre", catalog = "")
@IdClass(ActorRolePK.class)
public class ActorRole {
    private int actorIdActor;
    private int roleIdRole;
    private Actor actorByActorIdActor;
    private Role roleByRoleIdRole;
    private Collection<ActorSession> actorSessions;

    public ActorRole(int actorIdActor, int roleIdRole) {
        this.actorIdActor = actorIdActor;
        this.roleIdRole = roleIdRole;
    }

    public ActorRole() {

    }

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

        if (actorIdActor != actorRole.actorIdActor) return false;
        if (roleIdRole != actorRole.roleIdRole) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = actorIdActor;
        result = 31 * result + roleIdRole;
        return result;
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "Actor_idActor", referencedColumnName = "idActor", nullable = false, insertable = false, updatable = false)
    public Actor getActorByActorIdActor() {
        return actorByActorIdActor;
    }

    public void setActorByActorIdActor(Actor actorByActorIdActor) {
        this.actorByActorIdActor = actorByActorIdActor;
    }

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "Role_idRole", referencedColumnName = "idRole", nullable = false, insertable = false, updatable = false)
    public Role getRoleByRoleIdRole() {
        return roleByRoleIdRole;
    }

    public void setRoleByRoleIdRole(Role roleByRoleIdRole) {
        this.roleByRoleIdRole = roleByRoleIdRole;
    }

    @OneToMany(mappedBy = "actorRole")
    @JsonIgnore
    public Collection<ActorSession> getActorSessions() {
        return actorSessions;
    }

    public void setActorSessions(Collection<ActorSession> actorSessions) {
        this.actorSessions = actorSessions;
    }
}
