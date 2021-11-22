package com.theatre.BehindTheScenes.controller;

import com.theatre.BehindTheScenes.dto.DateDTO;
import com.theatre.BehindTheScenes.dto.SessionDTO;
import com.theatre.BehindTheScenes.model.Session;
import com.theatre.BehindTheScenes.model.User;
import com.theatre.BehindTheScenes.service.PlayService;
import com.theatre.BehindTheScenes.service.SessionService;
import com.theatre.BehindTheScenes.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class SessionController {

    private final SessionService sessionService;
    private final UserService userService;
    private final PlayService playService;

    public SessionController(SessionService sessionService, UserService userService, PlayService playService) {
        this.sessionService = sessionService;
        this.userService = userService;
        this.playService = playService;
    }

    @PostMapping(value = "/api/sessions")
    public ResponseEntity<Session> create(
            @RequestHeader("Authorization") String authorization,
            @RequestBody SessionDTO session
    ) throws IOException {
        User user = userService.getUserByAuthorization(authorization);
        if(user != null){
            Session temp = new Session();
            temp.setDate(session.getDate());
            temp.setHallNumber(session.getHallNumber());
            temp.setPlayByPlayIdPlay(playService.find(session.getIdPlay()));
            Session newSession = sessionService.create(temp);
            return new ResponseEntity<>(newSession, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/api/sessions/delete")
    public ResponseEntity<?> delete( @RequestHeader("Authorization") String authorization,
                                     @RequestBody List<Integer> ids) throws UnsupportedEncodingException {

        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            final boolean deleted = sessionService.deleteIn(ids);
            return deleted
                    ? new ResponseEntity<>(HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/api/sessions/month")
    public ResponseEntity<List<SessionDTO>> findSessionsThisMonth(
            @RequestBody DateDTO date
    ) throws IOException {
            List<Session> sessions = sessionService.findSessionsOfThisMonth(new Date(date.getDate()));
            List<SessionDTO> sessionDTOS = new ArrayList<>();
            for(Session session: sessions){
                SessionDTO dto = new SessionDTO();
                dto.setDate(session.getDate());
                dto.setPlayByPlayIdPlay(session.getPlayByPlayIdPlay());
                dto.setHallNumber(session.getHallNumber());
                dto.setId(session.getIdSession());
                sessionDTOS.add(dto);
            }
            return new ResponseEntity<>(sessionDTOS, HttpStatus.CREATED);
    }

    @PostMapping(value = "/api/sessions/date")
    public ResponseEntity<List<SessionDTO>> findSessionsThisDate(
            @RequestBody DateDTO date
    ){
            List<Session> sessions = sessionService.findSessionsOfThisDate(new Date(date.getDate()));
            List<SessionDTO> sessionDTOS = new ArrayList<>();
            for(Session session: sessions){
                SessionDTO dto = new SessionDTO();
                dto.setDate(session.getDate());
                dto.setPlayByPlayIdPlay(session.getPlayByPlayIdPlay());
                dto.setHallNumber(session.getHallNumber());
                dto.setId(session.getIdSession());
                sessionDTOS.add(dto);
            }
            return new ResponseEntity<>(sessionDTOS, HttpStatus.CREATED);
    }

}
