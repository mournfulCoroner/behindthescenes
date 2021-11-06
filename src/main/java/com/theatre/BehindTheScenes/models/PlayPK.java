package com.theatre.BehindTheScenes.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class PlayPK implements Serializable {
    private int idPlay;
    private int scriptIdScript;

    @Column(name = "idPlay", nullable = false)
    @Id
    public int getIdPlay() {
        return idPlay;
    }

    public void setIdPlay(int idPlay) {
        this.idPlay = idPlay;
    }

    @Column(name = "Script_idScript", nullable = false)
    @Id
    public int getScriptIdScript() {
        return scriptIdScript;
    }

    public void setScriptIdScript(int scriptIdScript) {
        this.scriptIdScript = scriptIdScript;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlayPK playPK = (PlayPK) o;
        return idPlay == playPK.idPlay && scriptIdScript == playPK.scriptIdScript;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPlay, scriptIdScript);
    }
}
