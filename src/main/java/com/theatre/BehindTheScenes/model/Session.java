package com.theatre.BehindTheScenes.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
public class Session {
    private int idSession;
    private Timestamp date;
    private int hallNumber;
    private Collection<ActorSession> actorSessionsByIdSession;
    private Play playByPlayIdPlay;
    private Collection<SessionSeat> sessionSeatsByIdSession;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Session session = (Session) o;

        if (idSession != session.idSession) return false;
        if (hallNumber != session.hallNumber) return false;
        if (date != null ? !date.equals(session.date) : session.date != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idSession;
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + hallNumber;
        return result;
    }

    @OneToMany(mappedBy = "sessionBySessionIdSession")
    public Collection<ActorSession> getActorSessionsByIdSession() {
        return actorSessionsByIdSession;
    }

    public void setActorSessionsByIdSession(Collection<ActorSession> actorSessionsByIdSession) {
        this.actorSessionsByIdSession = actorSessionsByIdSession;
    }

    @ManyToOne
    @JoinColumn(name = "Play_idPlay", referencedColumnName = "idPlay", nullable = false, insertable = false, updatable = false)
    public Play getPlayByPlayIdPlay() {
        return playByPlayIdPlay;
    }

    public void setPlayByPlayIdPlay(Play playByPlayIdPlay) {
        this.playByPlayIdPlay = playByPlayIdPlay;
    }

    @OneToMany(mappedBy = "sessionBySessionIdSession")
    public Collection<SessionSeat> getSessionSeatsByIdSession() {
        return sessionSeatsByIdSession;
    }

    public void setSessionSeatsByIdSession(Collection<SessionSeat> sessionSeatsByIdSession) {
        this.sessionSeatsByIdSession = sessionSeatsByIdSession;
    }
}
