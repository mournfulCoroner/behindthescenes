package com.theatre.BehindTheScenes.dto;

import java.sql.Timestamp;

public class SessionDTO {
    private Timestamp date;
    private int hallNumber;
    private int idPlay;

    public int getIdPlay() {
        return idPlay;
    }

    public void setIdPlay(int idPlay) {
        this.idPlay = idPlay;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public int getHallNumber() {
        return hallNumber;
    }

    public void setHallNumber(int hallNumber) {
        this.hallNumber = hallNumber;
    }
}
