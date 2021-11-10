package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.ActorSession;
import com.theatre.BehindTheScenes.model.ActorSessionPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorSessionRepository extends JpaRepository<ActorSession, ActorSessionPK> {
}