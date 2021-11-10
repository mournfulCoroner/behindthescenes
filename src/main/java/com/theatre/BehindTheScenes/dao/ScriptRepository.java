package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Script;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScriptRepository extends JpaRepository<Script, Integer> {
}