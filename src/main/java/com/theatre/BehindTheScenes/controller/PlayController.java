package com.theatre.BehindTheScenes.controller;

import com.theatre.BehindTheScenes.dto.DateDTO;
import com.theatre.BehindTheScenes.dto.PlayDTO;
import com.theatre.BehindTheScenes.model.Play;
import com.theatre.BehindTheScenes.model.User;
import com.theatre.BehindTheScenes.service.PlayService;
import com.theatre.BehindTheScenes.service.ScriptService;
import com.theatre.BehindTheScenes.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
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
            @RequestBody PlayDTO play
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

    @PostMapping(value = "/api/plays/delete")
    public ResponseEntity<?> delete( @RequestHeader("Authorization") String authorization,
                                     @RequestBody List<Integer> ids) throws UnsupportedEncodingException {

        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            final boolean deleted = playService.deleteIn(ids);
            return deleted
                    ? new ResponseEntity<>(HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/api/plays/month")
    public ResponseEntity<List<Play>> findPlaysThisMonth(
            @RequestBody DateDTO date
    ) throws IOException {
            List<Play> plays = playService.findPlaysOfThisMonth(new Date(date.getDate()));
            return new ResponseEntity<>(plays, HttpStatus.OK);
    }

    @PostMapping(value = "/api/plays/before")
    public ResponseEntity<List<Play>> findPlaysBeforeThisMonth(
            @RequestBody DateDTO date
    ) throws IOException, ParseException {
            List<Play> plays = playService.findPlaysBeforeThisMonth(new Date(date.getDate()));
            return new ResponseEntity<>(plays, HttpStatus.OK);
    }

    @PostMapping(value = "/api/plays/after")
    public ResponseEntity<List<Play>> findPlaysAfterThisMonth(
            @RequestBody DateDTO date
    ) throws IOException {
            List<Play> plays = playService.findPlaysAfterThisMonth(new Date(date.getDate()));
            return new ResponseEntity<>(plays, HttpStatus.OK);
    }
}
