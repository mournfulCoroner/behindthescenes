package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Replic;
import com.theatre.BehindTheScenes.model.ReplicPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplicRepository extends JpaRepository<Replic, ReplicPK> {
}