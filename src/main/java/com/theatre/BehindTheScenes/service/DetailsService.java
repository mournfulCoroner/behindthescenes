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

    /**
     * Нужен для настройки поиска пользователя по имени в SpringSecurity
     * @param username имя пользователя
     * @return экземпляр класса org.springframework.security.core.userdetails.User
     * @throws UsernameNotFoundException если пользователь не найден, то выкидывает эту ошибку
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getUserByUsername(username);
        if (user == null){
            return null;
        }
        System.out.println(user.getEncodePassword());
        return new org.springframework.security.core.userdetails.User(
                user.getNickname(),
                user.getEncodePassword(),
                userService.getUserAuthorities(user.getId())
        );
    }
}
