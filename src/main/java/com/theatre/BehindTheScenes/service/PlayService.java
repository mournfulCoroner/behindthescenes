package com.theatre.BehindTheScenes.service;

import com.theatre.BehindTheScenes.dao.PlayRepository;
import com.theatre.BehindTheScenes.model.Play;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.text.SimpleDateFormat;
import java.util.*;

@Service
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

    public List<Play> findPlaysOfThisMonth(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        GregorianCalendar calendarBefore = new GregorianCalendar();
        GregorianCalendar calendarAfter = new GregorianCalendar();

        calendarAfter.setTime(date);
        calendarBefore.setTime(date);

        calendarBefore.set(Calendar.DAY_OF_MONTH,
                calendarBefore.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendarAfter.set(Calendar.DAY_OF_MONTH, 1);

        return playRepository.findPlaysThisMonth(formatter.format(calendarBefore.getTime()),
                formatter.format(calendarAfter.getTime()));
    }

    public List<Play> findPlaysBeforeThisMonth(Date date) {

        GregorianCalendar calendarBefore = new GregorianCalendar();

        calendarBefore.setTime(date);

        calendarBefore.set(Calendar.DAY_OF_MONTH, 1);

        return playRepository.findAllByPremierDateBeforeOrderByPremierDate(calendarBefore.getTime());
    }

    public List<Play> findPlaysAfterThisMonth(Date date) {
        GregorianCalendar calendarAfter = new GregorianCalendar();

        calendarAfter.setTime(date);

        calendarAfter.set(Calendar.DAY_OF_MONTH,
                calendarAfter.getActualMaximum(Calendar.DAY_OF_MONTH));

        return playRepository.findAllByPremierDateAfterOrderByPremierDate(calendarAfter.getTime());
    }
    
}
