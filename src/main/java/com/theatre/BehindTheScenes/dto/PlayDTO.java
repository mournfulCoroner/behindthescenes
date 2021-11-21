package com.theatre.BehindTheScenes.dto;


import java.sql.Date;

public class PlayDTO {
    private Date premierDate;
    private Date endDate;
    private int idScript;

    public PlayDTO() {
    }

    public PlayDTO(Date premierDate, Date endDate, int idScript) {
        this.premierDate = premierDate;
        this.endDate = endDate;
        this.idScript = idScript;
    }

    public Date getPremierDate() {
        return premierDate;
    }

    public void setPremierDate(Date premierDate) {
        this.premierDate = premierDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getIdScript() {
        return idScript;
    }

    public void setIdScript(int idScript) {
        this.idScript = idScript;
    }
}
