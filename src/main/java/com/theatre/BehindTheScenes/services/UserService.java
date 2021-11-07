package com.theatre.BehindTheScenes.services;

import com.theatre.BehindTheScenes.dao.UserRepository;
import com.theatre.BehindTheScenes.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(String username){
        return userRepository.findByNickname(username);
    }

    public void save(User user){
        userRepository.save(user);
    }
}

