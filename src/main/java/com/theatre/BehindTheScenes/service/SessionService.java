package com.theatre.BehindTheScenes.service;

import com.theatre.BehindTheScenes.dao.SessionRepository;
import com.theatre.BehindTheScenes.model.Play;
import com.theatre.BehindTheScenes.model.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Transactional
    public Session create(Session session) {
        return sessionRepository.save(session);
    }

//    public boolean delete(int id) {
//        long count = sessionRepository.deleteByIdSession(id);
//        return count > 0;
//    }

    @Transactional
    public boolean deleteIn(List<Integer> ids) {
        long count = sessionRepository.deleteByIdSessionIn(ids);
        return count > 0;
    }

    public List<Session> findSessionsOfThisMonth(Date date) {
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        GregorianCalendar calendarBefore = new GregorianCalendar();
        GregorianCalendar calendarAfter = new GregorianCalendar();

        calendarAfter.setTime(date);
        calendarBefore.setTime(date);

        calendarBefore.set(Calendar.DAY_OF_MONTH,
                calendarBefore.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendarAfter.set(Calendar.DAY_OF_MONTH, 1);

        return sessionRepository.findSessionsThisMonth(calendarBefore.getTime(), calendarAfter.getTime());
    }

    public List<Session> findSessionsOfThisDate(Date date){
        return sessionRepository.findSessionsByDate(date);
    }

}
