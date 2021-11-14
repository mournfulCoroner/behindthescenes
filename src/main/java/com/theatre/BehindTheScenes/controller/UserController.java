package com.theatre.BehindTheScenes.controller;

import com.theatre.BehindTheScenes.dto.LoginDTO;
import com.theatre.BehindTheScenes.dto.UserDTO;
import com.theatre.BehindTheScenes.model.User;
import com.theatre.BehindTheScenes.service.DetailsService;
import com.theatre.BehindTheScenes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
public class UserController {
    private final UserService userService;
    private final DetailsService detailsService;

    @Autowired
    public UserController(UserService userService, DetailsService detailsService) {
        this.userService = userService;
        this.detailsService = detailsService;
    }

    /**
     * регистрирует пользователя
     * @param userDTO принимает nickname и password
     * @return возвращает authorization и nickname или HttpStatus.BAD_REQUEST, если nickname уже есть
     */
    @PostMapping(value = "/users/registration")
    public ResponseEntity<LoginDTO> registration(@RequestBody UserDTO userDTO) {
        if (userService.saveUser(userDTO) == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        LoginDTO loginDTO = new LoginDTO(
                userService.codeBase64(userDTO.getNickname(), userDTO.getPassword()),
                userDTO.getNickname());

        return new ResponseEntity<>(loginDTO, HttpStatus.OK);
    }

    /**
     * логинит пользователя
     * @param userDTO принимает nickname и password
     * @return возвращает authorization и nickname или HttpStatus.UNAUTHORIZED, если nickname или пароль неправильный
     */
    @PostMapping(value = "/users/my_login")
    public ResponseEntity<LoginDTO> login(@RequestBody UserDTO userDTO){
        PasswordEncoder encoder = User.PASSWORD_ENCODER;
        
        UserDetails user = detailsService.loadUserByUsername(userDTO.getNickname());

        if (user == null || !encoder.matches(userDTO.getPassword(), user.getPassword())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        LoginDTO loginDTO = new LoginDTO(
                userService.codeBase64(userDTO.getNickname(), userDTO.getPassword()),
                userDTO.getNickname());

        return new ResponseEntity<>(loginDTO, HttpStatus.OK);
    }

    /**
     * по токену для авторизации возвращает никнейм пользователя
     * @param authorization токен для авторизации
     * @return никнеём пользователя, которому соответствует authorization
     */
    @GetMapping(value = "users/nickname")
    public ResponseEntity<String> getNickname(@RequestHeader("Authorization") String authorization) throws UnsupportedEncodingException {
        return new ResponseEntity<>(userService.getNameByAuthorization(authorization), HttpStatus.OK);
    }

}
