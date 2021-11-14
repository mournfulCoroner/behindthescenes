package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Script;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScriptRepository extends JpaRepository<Script, Integer> {
    List<Script> findAllByTitleContaining(String infix);
    long deleteByIdScript(int id);
}