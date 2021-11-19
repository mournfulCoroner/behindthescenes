package com.theatre.BehindTheScenes.controller;

import com.theatre.BehindTheScenes.model.ActorRole;
import com.theatre.BehindTheScenes.model.Play;
import com.theatre.BehindTheScenes.model.Role;
import com.theatre.BehindTheScenes.model.User;
import com.theatre.BehindTheScenes.service.PlayService;
import com.theatre.BehindTheScenes.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

@RestController
public class PlayController {
    
    private final PlayService playService;
    private final UserService userService;

    public PlayController(PlayService playService, UserService userService) {
        this.playService = playService;
        this.userService = userService;
    }

    @PostMapping(value = "/api/plays")
    public ResponseEntity<Play> create(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Play play
    ) throws IOException {
        User user = userService.getUserByAuthorization(authorization);
        if(user != null){
            Play newPlay = playService.create(play);
            return new ResponseEntity<>(newPlay, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping(value = "/api/plays/{id}")
    public ResponseEntity<?> delete( @RequestHeader("Authorization") String authorization,
                                     @PathVariable(name = "id") int id) throws UnsupportedEncodingException {

        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            final boolean deleted = playService.delete(id);
            return deleted
                    ? new ResponseEntity<>(HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/api/plays/month")
    public ResponseEntity<List<Play>> findPlaysThisMonth(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Date date
    ) throws IOException {
        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            List<Play> plays = playService.findPlaysOfThisMonth(date);
            return new ResponseEntity<>(plays, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/api/plays/before")
    public ResponseEntity<List<Play>> findPlaysBeforeThisMonth(
            @RequestBody Date date
    ) throws IOException {

            List<Play> plays = playService.findPlaysBeforeThisMonth(date);
            return new ResponseEntity<>(plays, HttpStatus.CREATED);
    }

    @GetMapping(value = "/api/plays/month")
    public ResponseEntity<List<Play>> findPlaysAfterThisMonth(
            @RequestBody Date date
    ) throws IOException {
            List<Play> plays = playService.findPlaysAfterThisMonth(date);
            return new ResponseEntity<>(plays, HttpStatus.CREATED);
    }
}
