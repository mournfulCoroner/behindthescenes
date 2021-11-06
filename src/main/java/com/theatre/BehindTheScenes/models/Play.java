package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@IdClass(PlayPK.class)
public class Play {
    private int idPlay;
    private Date premierDate;
    private Date endDate;
    private int scriptIdScript;
    private Script scriptByScriptIdScript;
    private Session sessionByIdPlay;

    @Id
    @Column(name = "idPlay", nullable = false)
    public int getIdPlay() {
        return idPlay;
    }

    public void setIdPlay(int idPlay) {
        this.idPlay = idPlay;
    }

    @Basic
    @Column(name = "premierDate", nullable = true)
    public Date getPremierDate() {
        return premierDate;
    }

    public void setPremierDate(Date premierDate) {
        this.premierDate = premierDate;
    }

    @Basic
    @Column(name = "endDate", nullable = true)
    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @Id
    @Column(name = "Script_idScript", nullable = false)
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
        Play play = (Play) o;
        return idPlay == play.idPlay && scriptIdScript == play.scriptIdScript && Objects.equals(premierDate, play.premierDate) && Objects.equals(endDate, play.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPlay, premierDate, endDate, scriptIdScript);
    }

    @ManyToOne
    @JoinColumn(name = "Script_idScript", referencedColumnName = "idScript", nullable = false)
    public Script getScriptByScriptIdScript() {
        return scriptByScriptIdScript;
    }

    public void setScriptByScriptIdScript(Script scriptByScriptIdScript) {
        this.scriptByScriptIdScript = scriptByScriptIdScript;
    }

    @ManyToOne
    @JoinColumn(name = "idPlay", referencedColumnName = "Play_idPlay", nullable = false)
    public Session getSessionByIdPlay() {
        return sessionByIdPlay;
    }

    public void setSessionByIdPlay(Session sessionByIdPlay) {
        this.sessionByIdPlay = sessionByIdPlay;
    }
}
