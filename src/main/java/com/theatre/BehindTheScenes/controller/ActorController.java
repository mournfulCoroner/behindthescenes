package com.theatre.BehindTheScenes.controller;

import com.theatre.BehindTheScenes.model.Actor;
import com.theatre.BehindTheScenes.model.Role;
import com.theatre.BehindTheScenes.model.User;
import com.theatre.BehindTheScenes.service.ActorService;
import com.theatre.BehindTheScenes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
public class ActorController {

    private final ActorService actorService;
    private final UserService userService;

    @Autowired
    public ActorController(ActorService actorService, UserService userService) {
        this.actorService = actorService;
        this.userService = userService;
    }

    @PostMapping(value = "/api/actors")
    public ResponseEntity<Actor> create(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Actor actor
    ) throws IOException {
        User user = userService.getUserByAuthorization(authorization);
        System.out.println(user.getNickname() + " " + user.getPassword());
        if(user != null){
            Actor newActor = actorService.create(actor);
            return new ResponseEntity<>(newActor, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/api/actors/{name}")
    public ResponseEntity<?> findByName(
            @PathVariable(name = "name") String name
    ) throws UnsupportedEncodingException {

        List<Actor> actors = actorService.search(name);

        return actors != null
                ? new ResponseEntity<>(actors, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/api/actors/{id}")
    public ResponseEntity<?> delete( @RequestHeader("Authorization") String authorization,
                                     @PathVariable(name = "id") int id) throws UnsupportedEncodingException {

        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            final boolean deleted = actorService.delete(id);
            return deleted
                    ? new ResponseEntity<>(HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }



    @PutMapping(value = "/api/actors/{id}")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String authorization,
                                    @PathVariable(name = "id") int id, @RequestBody String name) throws UnsupportedEncodingException {

        User user = userService.getUserByAuthorization(authorization);

        if(user != null){
            Actor updActor = actorService.update(id, name);
            return new ResponseEntity<>(updActor, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(value = "/api/actors")
    public ResponseEntity<List<Actor>> read() throws UnsupportedEncodingException {

        final List<Actor> actors = actorService.findAll();

        return actors != null &&  !actors.isEmpty()
                ? new ResponseEntity<>(actors, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/api/actors/{id}/roles")
    public ResponseEntity<List<Role>> readActorRoles(@PathVariable(name = "id") int id) throws UnsupportedEncodingException {

        final List<Role> roles = actorService.getRoles(id);

        return roles != null &&  !roles.isEmpty()
                ? new ResponseEntity<>(roles, HttpStatus.OK)
                : new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }


}
