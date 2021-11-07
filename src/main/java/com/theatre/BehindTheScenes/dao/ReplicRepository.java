package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.models.Replic;
import com.theatre.BehindTheScenes.models.ReplicPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplicRepository extends JpaRepository<Replic, ReplicPK> {
}