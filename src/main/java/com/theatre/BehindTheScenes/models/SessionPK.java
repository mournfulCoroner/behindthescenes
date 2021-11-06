package com.theatre.BehindTheScenes.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class SessionPK implements Serializable {
    private int idSession;
    private int playIdPlay;

    @Column(name = "idSession", nullable = false)
    @Id
    public int getIdSession() {
        return idSession;
    }

    public void setIdSession(int idSession) {
        this.idSession = idSession;
    }

    @Column(name = "Play_idPlay", nullable = false)
    @Id
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
        SessionPK sessionPK = (SessionPK) o;
        return idSession == sessionPK.idSession && playIdPlay == sessionPK.playIdPlay;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idSession, playIdPlay);
    }
}
