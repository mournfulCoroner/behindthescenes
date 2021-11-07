package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Script {
    private int idScript;
    private String title;
    private String author;
    private byte inUse;
    private int rolesAmount;
    private Collection<Play> playsByIdScript;
    private Collection<Role> rolesByIdScript;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idScript", nullable = false)
    public int getIdScript() {
        return idScript;
    }

    public void setIdScript(int idScript) {
        this.idScript = idScript;
    }

    @Basic
    @Column(name = "title", nullable = false, length = 45)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "author", nullable = true, length = 45)
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    @Basic
    @Column(name = "inUse", nullable = false)
    public byte getInUse() {
        return inUse;
    }

    public void setInUse(byte inUse) {
        this.inUse = inUse;
    }

    @Basic
    @Column(name = "rolesAmount", nullable = false)
    public int getRolesAmount() {
        return rolesAmount;
    }

    public void setRolesAmount(int rolesAmount) {
        this.rolesAmount = rolesAmount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Script script = (Script) o;

        if (idScript != script.idScript) return false;
        if (inUse != script.inUse) return false;
        if (rolesAmount != script.rolesAmount) return false;
        if (title != null ? !title.equals(script.title) : script.title != null) return false;
        if (author != null ? !author.equals(script.author) : script.author != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idScript;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (author != null ? author.hashCode() : 0);
        result = 31 * result + (int) inUse;
        result = 31 * result + rolesAmount;
        return result;
    }

    @OneToMany(mappedBy = "scriptByScriptIdScript")
    public Collection<Play> getPlaysByIdScript() {
        return playsByIdScript;
    }

    public void setPlaysByIdScript(Collection<Play> playsByIdScript) {
        this.playsByIdScript = playsByIdScript;
    }

    @OneToMany(mappedBy = "scriptByScriptIdScript")
    public Collection<Role> getRolesByIdScript() {
        return rolesByIdScript;
    }

    public void setRolesByIdScript(Collection<Role> rolesByIdScript) {
        this.rolesByIdScript = rolesByIdScript;
    }
}
