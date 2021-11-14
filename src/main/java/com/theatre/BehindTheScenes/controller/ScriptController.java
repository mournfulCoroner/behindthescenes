package com.theatre.BehindTheScenes.controller;

import com.theatre.BehindTheScenes.dto.ScriptDTO;
import com.theatre.BehindTheScenes.model.Script;
import com.theatre.BehindTheScenes.model.User;
import com.theatre.BehindTheScenes.service.ScriptService;
import com.theatre.BehindTheScenes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public class ScriptController {
    private final ScriptService scriptService;
    private final UserService userService;

    @Autowired
    public ScriptController(ScriptService scriptService, UserService userService) {
        this.scriptService = scriptService;
        this.userService = userService;
    }

    @PostMapping(value = "/scripts")
    public ResponseEntity<Script> create(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Script script
    ) throws IOException {
        User user = userService.getUserByAuthorization(authorization);


        if(user != null){
            Script newScript = scriptService.create(script);
            return new ResponseEntity<>(newScript, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/scripts/{name}")
    public ResponseEntity<?> findByName(
            @PathVariable(name = "name") String name
    ) throws UnsupportedEncodingException {

        List<Script> scripts = scriptService.search(name);

        return scripts != null
                ? new ResponseEntity<>(scripts, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/scripts/{id}")
    public ResponseEntity<?> delete( @RequestHeader("Authorization") String authorization,
                                     @PathVariable(name = "id") int id) throws UnsupportedEncodingException {

        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            final boolean deleted = scriptService.delete(id);
            return deleted
                    ? new ResponseEntity<>(HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    @PutMapping(value = "/scripts/{id}")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String authorization,
                                    @PathVariable(name = "id") int id, @RequestBody ScriptDTO scriptDTO) throws UnsupportedEncodingException {

        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            scriptService.update(scriptDTO.getIdScript(), scriptDTO.getTitle(), scriptDTO.getAuthor());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/scripts")
    public ResponseEntity<List<Script>> read() throws UnsupportedEncodingException {

        final List<Script> scripts = scriptService.findAll();

        return scripts != null &&  !scripts.isEmpty()
                ? new ResponseEntity<>(scripts, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
