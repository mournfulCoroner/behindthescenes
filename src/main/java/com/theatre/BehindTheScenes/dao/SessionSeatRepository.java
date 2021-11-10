package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.SessionSeat;
import com.theatre.BehindTheScenes.model.SessionSeatPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionSeatRepository extends JpaRepository<SessionSeat, SessionSeatPK> {
}