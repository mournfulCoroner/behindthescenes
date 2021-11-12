package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.ActorRole;
import com.theatre.BehindTheScenes.model.ActorRolePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActorRoleRepository extends JpaRepository <ActorRole, ActorRolePK> {
    List<ActorRole> findAllByActorIdActor(int actorId);
}
