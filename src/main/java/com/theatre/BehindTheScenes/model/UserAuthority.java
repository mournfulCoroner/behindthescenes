package com.theatre.BehindTheScenes.model;

import javax.persistence.*;

@Entity
@Table(name = "user_authority", schema = "theatre", catalog = "")
@IdClass(UserAuthorityPK.class)
public class UserAuthority {
    private int userId;
    private int authorityId;
    private User userByUserId;

    @Id
    @Column(name = "User_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Id
    @Column(name = "Authority_id", nullable = false)
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

        UserAuthority that = (UserAuthority) o;

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

    @ManyToOne
    @JoinColumn(name = "User_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    public User getUserByUserId() {
        return userByUserId;
    }

    public void setUserByUserId(User userByUserId) {
        this.userByUserId = userByUserId;
    }
}
