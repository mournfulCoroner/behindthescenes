package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByNickname(String username);
}