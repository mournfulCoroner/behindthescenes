package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActorRepository extends JpaRepository<Actor,Integer> {
    List<Actor> findAllByNameContaining(String infix);
    long deleteByIdActor(int id);
}
