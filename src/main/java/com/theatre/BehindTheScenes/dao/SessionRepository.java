package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Integer> {
}