package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}