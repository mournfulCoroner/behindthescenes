package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Optional<Authority> findById(Integer id);
}
