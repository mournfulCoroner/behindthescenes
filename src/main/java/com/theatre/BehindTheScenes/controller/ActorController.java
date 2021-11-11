package com.theatre.BehindTheScenes.controller;

import com.theatre.BehindTheScenes.dao.ActorRepository;
import com.theatre.BehindTheScenes.model.Actor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ActorController {

    private final ActorRepository actorRepository;

    @Autowired
    public ActorController(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    @GetMapping("/actors")
    public List<Actor> getAll(){
        return actorRepository.findAll();
    }

}
