package com.theatre.BehindTheScenes.service;

import com.theatre.BehindTheScenes.dao.PlayRepository;
import com.theatre.BehindTheScenes.model.Play;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

public class PlayService {
    private final PlayRepository playRepository;

    @Autowired
    public PlayService(PlayRepository playRepository)
    {
        this.playRepository = playRepository;
    }

    public Play create(Play play) {
        return playRepository.save(play);
    }

    public boolean delete(int id) {
        long count = playRepository.deleteByIdPlay(id);
        return count > 0;
    }


    public List<Play> findAll(){
        return playRepository.findAll();
    }
    
}
