package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Collection;

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

        if (seatNumber != seat.seatNumber) return false;
        if (hallNumber != seat.hallNumber) return false;
        if (idSeat != seat.idSeat) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = seatNumber;
        result = 31 * result + hallNumber;
        result = 31 * result + idSeat;
        return result;
    }

    @OneToMany(mappedBy = "seatBySeatIdSeat")
    public Collection<SessionSeat> getSessionSeatsByIdSeat() {
        return sessionSeatsByIdSeat;
    }

    public void setSessionSeatsByIdSeat(Collection<SessionSeat> sessionSeatsByIdSeat) {
        this.sessionSeatsByIdSeat = sessionSeatsByIdSeat;
    }
}
