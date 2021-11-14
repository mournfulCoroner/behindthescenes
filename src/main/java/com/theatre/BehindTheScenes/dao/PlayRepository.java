package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Play;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PlayRepository extends JpaRepository<Play, Integer> {
    long deleteByIdPlay(int id);
}