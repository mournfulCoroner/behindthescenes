package com.theatre.BehindTheScenes.dto;

import com.theatre.BehindTheScenes.model.Play;

import java.sql.Timestamp;

public class SessionDTO {
    private int id;
    private Timestamp date;
    private int hallNumber;
    private int idPlay;
    private Play playByPlayIdPlay;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Play getPlayByPlayIdPlay() {
        return playByPlayIdPlay;
    }

    public void setPlayByPlayIdPlay(Play playByPlayIdPlay) {
        this.playByPlayIdPlay = playByPlayIdPlay;
    }

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
