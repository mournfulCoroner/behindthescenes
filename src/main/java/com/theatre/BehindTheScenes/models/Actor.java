package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Actor {
    private int idActor;
    private String name;
    private Collection<ActorRole> actorRolesByIdActor;

    @Id
    @Column(name = "idActor", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

        if (idActor != actor.idActor) return false;
        if (name != null ? !name.equals(actor.name) : actor.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idActor;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "actorByActorIdActor")
    public Collection<ActorRole> getActorRolesByIdActor() {
        return actorRolesByIdActor;
    }

    public void setActorRolesByIdActor(Collection<ActorRole> actorRolesByIdActor) {
        this.actorRolesByIdActor = actorRolesByIdActor;
    }
}
