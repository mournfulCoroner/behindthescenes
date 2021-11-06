package com.theatre.BehindTheScenes.models;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class RolePK implements Serializable {
    private int idRole;
    private int scriptIdScript;

    @Column(name = "idRole", nullable = false)
    @Id
    public int getIdRole() {
        return idRole;
    }

    public void setIdRole(int idRole) {
        this.idRole = idRole;
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
        RolePK rolePK = (RolePK) o;
        return idRole == rolePK.idRole && scriptIdScript == rolePK.scriptIdScript;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRole, scriptIdScript);
    }
}
