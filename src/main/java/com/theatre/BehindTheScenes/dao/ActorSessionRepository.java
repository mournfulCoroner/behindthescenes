package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.models.ActorSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorSessionRepository extends JpaRepository<ActorSession, Integer> {
}