package com.theatre.BehindTheScenes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Date;
import java.util.Collection;

@Entity
public class Play {
    private int idPlay;
    private Date premierDate;
    private Date endDate;
    private Script scriptByScriptIdScript;
    private Collection<Session> sessionsByIdPlay;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Play play = (Play) o;

        if (idPlay != play.idPlay) return false;
        if (premierDate != null ? !premierDate.equals(play.premierDate) : play.premierDate != null) return false;
        if (endDate != null ? !endDate.equals(play.endDate) : play.endDate != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idPlay;
        result = 31 * result + (premierDate != null ? premierDate.hashCode() : 0);
        result = 31 * result + (endDate != null ? endDate.hashCode() : 0);
        return result;
    }

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    @JoinColumn(name = "scriptIdScript", referencedColumnName = "idScript", nullable = false)
    public Script getScriptByScriptIdScript() {
        return scriptByScriptIdScript;
    }

    public void setScriptByScriptIdScript(Script scriptByScriptIdScript) {
        this.scriptByScriptIdScript = scriptByScriptIdScript;
    }

    @OneToMany(mappedBy = "playByPlayIdPlay")
    public Collection<Session> getSessionsByIdPlay() {
        return sessionsByIdPlay;
    }

    public void setSessionsByIdPlay(Collection<Session> sessionsByIdPlay) {
        this.sessionsByIdPlay = sessionsByIdPlay;
    }
}
