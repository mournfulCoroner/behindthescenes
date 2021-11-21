package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Integer> {
    long deleteByIdSessionIn(List<Integer> ids);

    @Query(value = "SELECT * FROM theatre.session WHERE DATE(session.date) = DATE(:date) ORDER BY session.date", nativeQuery = true)
    List<Session> findSessionsByDate(Date date);

    @Query(value = "SELECT * FROM theatre.session WHERE (session.date <= :beforeDate AND session.date >= :afterDate) ORDER BY session.date",
            nativeQuery = true)
    List<Session> findSessionsThisMonth(Date beforeDate, Date afterDate);
}