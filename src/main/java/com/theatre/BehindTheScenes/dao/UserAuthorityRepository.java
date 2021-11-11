package com.theatre.BehindTheScenes.dao;

import com.theatre.BehindTheScenes.model.UserAuthority;
import com.theatre.BehindTheScenes.model.UserAuthorityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAuthorityRepository extends JpaRepository <UserAuthority, UserAuthorityPK> {
    List<UserAuthority> findAllByUserId(Integer UserId);
}
