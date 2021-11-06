package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
public class Seat {
    private int seatNumber;
    private int hallNumber;
    private int idSeat;
    private Collection<SessionSeat> sessionSeatsByIdSeat;

    @Basic
    @Column(name = "seatNumber", nullable = false)
    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
        this.seatNumber = seatNumber;
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
    @Column(name = "idSeat", nullable = false)
    public int getIdSeat() {
        return idSeat;
    }

    public void setIdSeat(int idSeat) {
        this.idSeat = idSeat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Seat seat = (Seat) o;
        return seatNumber == seat.seatNumber && hallNumber == seat.hallNumber && idSeat == seat.idSeat;
    }

    @Override
    public int hashCode() {
        return Objects.hash(seatNumber, hallNumber, idSeat);
    }

    @OneToMany(mappedBy = "seatBySeatIdSeat")
    public Collection<SessionSeat> getSessionSeatsByIdSeat() {
        return sessionSeatsByIdSeat;
    }

    public void setSessionSeatsByIdSeat(Collection<SessionSeat> sessionSeatsByIdSeat) {
        this.sessionSeatsByIdSeat = sessionSeatsByIdSeat;
    }
}
