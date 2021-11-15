package com.theatre.BehindTheScenes.service;

import com.theatre.BehindTheScenes.dao.UserRepository;
import com.theatre.BehindTheScenes.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DetailsService implements UserDetailsService {
    final UserService userService;

    public DetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getUserByUsername(username);
        if (user == null){
            return null;
        }
        return new org.springframework.security.core.userdetails.User(
                user.getNickname(),
                user.getEncodePassword(),
                userService.getUserAuthorities(user.getId())
        );
    }
}
