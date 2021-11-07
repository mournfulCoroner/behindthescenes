package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}