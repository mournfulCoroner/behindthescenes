package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.models.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepository extends JpaRepository <Actor, Integer> {
}
