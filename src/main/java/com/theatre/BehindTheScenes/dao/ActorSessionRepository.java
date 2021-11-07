package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.models.ActorSession;
import com.theatre.BehindTheScenes.models.ActorSessionPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorSessionRepository extends JpaRepository<ActorSession, ActorSessionPK> {
}