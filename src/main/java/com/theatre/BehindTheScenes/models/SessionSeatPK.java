package com.theatre.BehindTheScenes.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class SessionSeatPK implements Serializable {
    private int seatIdSeat;
    private int sessionIdSession;

    @Column(name = "Seat_idSeat", nullable = false)
    @Id
    public int getSeatIdSeat() {
        return seatIdSeat;
    }

    public void setSeatIdSeat(int seatIdSeat) {
        this.seatIdSeat = seatIdSeat;
    }

    @Column(name = "Session_idSession", nullable = false)
    @Id
    public int getSessionIdSession() {
        return sessionIdSession;
    }

    public void setSessionIdSession(int sessionIdSession) {
        this.sessionIdSession = sessionIdSession;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SessionSeatPK that = (SessionSeatPK) o;
        return seatIdSeat == that.seatIdSeat && sessionIdSession == that.sessionIdSession;
    }

    @Override
    public int hashCode() {
        return Objects.hash(seatIdSeat, sessionIdSession);
    }
}
