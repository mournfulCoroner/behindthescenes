package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Integer> {
}