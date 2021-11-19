package com.theatre.BehindTheScenes.controller;

import com.theatre.BehindTheScenes.model.Session;
import com.theatre.BehindTheScenes.model.User;
import com.theatre.BehindTheScenes.service.SessionService;
import com.theatre.BehindTheScenes.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

@RestController
public class SessionController {

    private final SessionService sessionService;
    private final UserService userService;

    public SessionController(SessionService sessionService, UserService userService) {
        this.sessionService = sessionService;
        this.userService = userService;
    }

    @PostMapping(value = "/api/sessions")
    public ResponseEntity<Session> create(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Session session
    ) throws IOException {
        User user = userService.getUserByAuthorization(authorization);
        if(user != null){
            Session newSession = sessionService.create(session);
            return new ResponseEntity<>(newSession, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping(value = "/api/sessions/{id}")
    public ResponseEntity<?> delete( @RequestHeader("Authorization") String authorization,
                                     @PathVariable(name = "id") int id) throws UnsupportedEncodingException {

        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            final boolean deleted = sessionService.delete(id);
            return deleted
                    ? new ResponseEntity<>(HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/api/sessions/month")
    public ResponseEntity<List<Session>> findSessionsThisMonth(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Date date
    ) throws IOException {
        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            List<Session> sessions = sessionService.findSessionsOfThisMonth(date);
            return new ResponseEntity<>(sessions, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/api/sessions/date")
    public ResponseEntity<List<Session>> findSessionsBeforeThisMonth(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Date date
    ) throws IOException {
        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            List<Session> sessions = sessionService.findSessionsOfThisDate(date);
            return new ResponseEntity<>(sessions, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
