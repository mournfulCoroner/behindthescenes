package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.models.SessionSeat;
import com.theatre.BehindTheScenes.models.SessionSeatPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionSeatRepository extends JpaRepository<SessionSeat, SessionSeatPK> {
}