package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@IdClass(SessionPK.class)
public class Session {
    private int idSession;
    private Timestamp date;
    private int hallNumber;
    private int playIdPlay;
    private ActorSession actorSessionByIdSession;
    private SessionSeat sessionSeatByIdSession;

    @Id
    @Column(name = "idSession", nullable = false)
    public int getIdSession() {
        return idSession;
    }

    public void setIdSession(int idSession) {
        this.idSession = idSession;
    }

    @Basic
    @Column(name = "date", nullable = true)
    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    @Basic
    @Column(name = "hallNumber", nullable = false)
    public int getHallNumber() {
        return hallNumber;
    }

    public void setHallNumber(int hallNumber) {
        this.hallNumber = hallNumber;
    }

    @Id
    @Column(name = "Play_idPlay", nullable = false)
    public int getPlayIdPlay() {
        return playIdPlay;
    }

    public void setPlayIdPlay(int playIdPlay) {
        this.playIdPlay = playIdPlay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Session session = (Session) o;
        return idSession == session.idSession && hallNumber == session.hallNumber && playIdPlay == session.playIdPlay && Objects.equals(date, session.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idSession, date, hallNumber, playIdPlay);
    }

    @ManyToOne
    @JoinColumn(name = "idSession", referencedColumnName = "Session_idSession", nullable = false)
    public ActorSession getActorSessionByIdSession() {
        return actorSessionByIdSession;
    }

    public void setActorSessionByIdSession(ActorSession actorSessionByIdSession) {
        this.actorSessionByIdSession = actorSessionByIdSession;
    }

    @ManyToOne
    @JoinColumn(name = "idSession", referencedColumnName = "Session_idSession", nullable = false)
    public SessionSeat getSessionSeatByIdSession() {
        return sessionSeatByIdSession;
    }

    public void setSessionSeatByIdSession(SessionSeat sessionSeatByIdSession) {
        this.sessionSeatByIdSession = sessionSeatByIdSession;
    }
}
