package com.theatre.BehindTheScenes.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Role {
    private int idRole;
    private String roleName;
    private byte isMain;
    private Collection<ActorRole> actorRolesByIdRole;
    private Collection<Replic> replicsByIdRole;
    private Script scriptByScriptIdScript;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Role role = (Role) o;

        if (idRole != role.idRole) return false;
        if (isMain != role.isMain) return false;
        if (roleName != null ? !roleName.equals(role.roleName) : role.roleName != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idRole;
        result = 31 * result + (roleName != null ? roleName.hashCode() : 0);
        result = 31 * result + (int) isMain;
        return result;
    }

    @OneToMany(mappedBy = "roleByRoleIdRole")
    public Collection<ActorRole> getActorRolesByIdRole() {
        return actorRolesByIdRole;
    }

    public void setActorRolesByIdRole(Collection<ActorRole> actorRolesByIdRole) {
        this.actorRolesByIdRole = actorRolesByIdRole;
    }

    @OneToMany(mappedBy = "roleByRoleIdRole")
    public Collection<Replic> getReplicsByIdRole() {
        return replicsByIdRole;
    }

    public void setReplicsByIdRole(Collection<Replic> replicsByIdRole) {
        this.replicsByIdRole = replicsByIdRole;
    }

    @ManyToOne
    @JoinColumn(name = "Script_idScript", referencedColumnName = "idScript", nullable = false, insertable = false, updatable = false)
    public Script getScriptByScriptIdScript() {
        return scriptByScriptIdScript;
    }

    public void setScriptByScriptIdScript(Script scriptByScriptIdScript) {
        this.scriptByScriptIdScript = scriptByScriptIdScript;
    }
}
