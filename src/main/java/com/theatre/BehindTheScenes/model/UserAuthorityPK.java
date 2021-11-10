package com.theatre.BehindTheScenes.model;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class UserAuthorityPK implements Serializable {
    private int userId;
    private int authorityId;

    @Column(name = "User_id", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "Authority_id", nullable = false)
    @Id
    public int getAuthorityId() {
        return authorityId;
    }

    public void setAuthorityId(int authorityId) {
        this.authorityId = authorityId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserAuthorityPK that = (UserAuthorityPK) o;

        if (userId != that.userId) return false;
        if (authorityId != that.authorityId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId;
        result = 31 * result + authorityId;
        return result;
    }
}
