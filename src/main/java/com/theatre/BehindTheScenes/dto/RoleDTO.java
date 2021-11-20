package com.theatre.BehindTheScenes.dto;

public class RoleDTO {
    private int idRole;
    private String roleName;
    private byte isMain;
    private int idScript;

    public RoleDTO(int idRole, String roleName, byte isMain, int idScript) {
        this.idRole = idRole;
        this.roleName = roleName;
        this.isMain = isMain;
        this.idScript = idScript;
    }

    public RoleDTO() {
    }

    public int getIdRole() {
        return idRole;
    }

    public void setIdRole(int idRole) {
        this.idRole = idRole;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public byte getIsMain() {
        return isMain;
    }

    public void setIsMain(byte isMain) {
        this.isMain = isMain;
    }

    public int getIdScript() {
        return idScript;
    }

    public void setIdScript(int idScript) {
        this.idScript = idScript;
    }
}
