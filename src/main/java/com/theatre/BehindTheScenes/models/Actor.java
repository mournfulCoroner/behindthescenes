package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Actor {
    private int idActor;
    private String name;
    private Collection<ActorRole> actorRolesByIdActor;

    @Id
    @GeneratedValue
    @Column(name = "idActor", nullable = false)
    public int getIdActor() {
        return idActor;
    }

    public void setIdActor(int idActor) {
        this.idActor = idActor;
    }

    @Basic
    @Column(name = "Name", nullable = true, length = 45)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Actor actor = (Actor) o;
        return idActor == actor.idActor && Objects.equals(name, actor.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idActor, name);
    }

    @OneToMany(mappedBy = "actorByActorIdActor")
    public Collection<ActorRole> getActorRolesByIdActor() {
        return actorRolesByIdActor;
    }

    public void setActorRolesByIdActor(Collection<ActorRole> actorRolesByIdActor) {
        this.actorRolesByIdActor = actorRolesByIdActor;
    }
}
