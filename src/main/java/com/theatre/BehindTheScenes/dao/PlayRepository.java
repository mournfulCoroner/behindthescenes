package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Play;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;


public interface PlayRepository extends JpaRepository<Play, Integer> {
    long deleteByIdPlay(int id);

    List<Play> findAllByPremierDateBeforeOrderByPremierDate(Date beforeDate);
    List<Play> findAllByPremierDateAfterOrderByPremierDate(Date afterDate);

    @Query(value = "SELECT * FROM theatre.play WHERE (premier_date <= :beforeDate AND premier_date >= :afterDate) ORDER BY premier_date",
            nativeQuery = true)
    List<Play> findPlaysThisMonth(String beforeDate, String afterDate);
}