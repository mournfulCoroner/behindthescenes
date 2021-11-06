package com.theatre.BehindTheScenes.models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@IdClass(RolePK.class)
public class Role {
    private int idRole;
    private String roleName;
    private byte isMain;
    private int scriptIdScript;
    private ActorRole actorRoleByIdRole;
    private Replic replicByIdRole;
    private Script scriptByScriptIdScript;

    @Id
    @Column(name = "idRole", nullable = false)
    public int getIdRole() {
        return idRole;
    }

    public void setIdRole(int idRole) {
        this.idRole = idRole;
    }

    @Basic
    @Column(name = "roleName", nullable = false, length = 45)
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Basic
    @Column(name = "isMain", nullable = false)
    public byte getIsMain() {
        return isMain;
    }

    public void setIsMain(byte isMain) {
        this.isMain = isMain;
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
        Role role = (Role) o;
        return idRole == role.idRole && isMain == role.isMain && scriptIdScript == role.scriptIdScript && Objects.equals(roleName, role.roleName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRole, roleName, isMain, scriptIdScript);
    }

    @ManyToOne
    @JoinColumn(name = "idRole", referencedColumnName = "Role_idRole", nullable = false)
    public ActorRole getActorRoleByIdRole() {
        return actorRoleByIdRole;
    }

    public void setActorRoleByIdRole(ActorRole actorRoleByIdRole) {
        this.actorRoleByIdRole = actorRoleByIdRole;
    }

    @ManyToOne
    @JoinColumn(name = "idRole", referencedColumnName = "Role_idRole", nullable = false)
    public Replic getReplicByIdRole() {
        return replicByIdRole;
    }

    public void setReplicByIdRole(Replic replicByIdRole) {
        this.replicByIdRole = replicByIdRole;
    }

    @ManyToOne
    @JoinColumn(name = "Script_idScript", referencedColumnName = "idScript", nullable = false)
    public Script getScriptByScriptIdScript() {
        return scriptByScriptIdScript;
    }

    public void setScriptByScriptIdScript(Script scriptByScriptIdScript) {
        this.scriptByScriptIdScript = scriptByScriptIdScript;
    }
}
