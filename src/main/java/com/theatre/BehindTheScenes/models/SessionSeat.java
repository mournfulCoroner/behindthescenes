package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Objects;

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
        return seatIdSeat == that.seatIdSeat && sessionIdSession == that.sessionIdSession && isFree == that.isFree && isBookes == that.isBookes && cost == that.cost;
    }

    @Override
    public int hashCode() {
        return Objects.hash(seatIdSeat, sessionIdSession, isFree, isBookes, cost);
    }

    @ManyToOne
    @JoinColumn(name = "Seat_idSeat", referencedColumnName = "idSeat", nullable = false)
    public Seat getSeatBySeatIdSeat() {
        return seatBySeatIdSeat;
    }

    public void setSeatBySeatIdSeat(Seat seatBySeatIdSeat) {
        this.seatBySeatIdSeat = seatBySeatIdSeat;
    }
}
