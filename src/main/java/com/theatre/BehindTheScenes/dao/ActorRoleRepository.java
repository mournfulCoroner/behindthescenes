package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.models.ActorRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRoleRepository extends JpaRepository <ActorRole, Integer> {
}
