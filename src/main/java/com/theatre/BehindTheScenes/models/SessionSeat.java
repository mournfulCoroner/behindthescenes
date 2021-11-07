package com.theatre.BehindTheScenes.models;

import javax.persistence.*;

@Entity
@Table(name = "session_seat", schema = "theatre", catalog = "")
@IdClass(SessionSeatPK.class)
public class SessionSeat {
    private int seatIdSeat;
    private int sessionIdSession;
    private byte isFree;
    private byte isBookes;
    private int cost;
    private Seat seatBySeatIdSeat;
    private Session sessionBySessionIdSession;

    @Id
    @Column(name = "Seat_idSeat", nullable = false)
    public int getSeatIdSeat() {
        return seatIdSeat;
    }

    public void setSeatIdSeat(int seatIdSeat) {
        this.seatIdSeat = seatIdSeat;
    }

    @Id
    @Column(name = "Session_idSession", nullable = false)
    public int getSessionIdSession() {
        return sessionIdSession;
    }

    public void setSessionIdSession(int sessionIdSession) {
        this.sessionIdSession = sessionIdSession;
    }

    @Basic
    @Column(name = "isFree", nullable = false)
    public byte getIsFree() {
        return isFree;
    }

    public void setIsFree(byte isFree) {
        this.isFree = isFree;
    }

    @Basic
    @Column(name = "isBookes", nullable = false)
    public byte getIsBookes() {
        return isBookes;
    }

    public void setIsBookes(byte isBookes) {
        this.isBookes = isBookes;
    }

    @Basic
    @Column(name = "cost", nullable = false)
    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SessionSeat that = (SessionSeat) o;

        if (seatIdSeat != that.seatIdSeat) return false;
        if (sessionIdSession != that.sessionIdSession) return false;
        if (isFree != that.isFree) return false;
        if (isBookes != that.isBookes) return false;
        if (cost != that.cost) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = seatIdSeat;
        result = 31 * result + sessionIdSession;
        result = 31 * result + (int) isFree;
        result = 31 * result + (int) isBookes;
        result = 31 * result + cost;
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "Seat_idSeat", referencedColumnName = "idSeat", nullable = false, insertable = false, updatable = false)
    public Seat getSeatBySeatIdSeat() {
        return seatBySeatIdSeat;
    }

    public void setSeatBySeatIdSeat(Seat seatBySeatIdSeat) {
        this.seatBySeatIdSeat = seatBySeatIdSeat;
    }

    @ManyToOne
    @JoinColumn(name = "Session_idSession", referencedColumnName = "idSession", nullable = false, insertable = false, updatable = false)
    public Session getSessionBySessionIdSession() {
        return sessionBySessionIdSession;
    }

    public void setSessionBySessionIdSession(Session sessionBySessionIdSession) {
        this.sessionBySessionIdSession = sessionBySessionIdSession;
    }
}
