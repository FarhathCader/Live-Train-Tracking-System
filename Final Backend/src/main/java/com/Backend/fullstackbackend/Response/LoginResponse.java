package com.Backend.fullstackbackend.Response;

import com.Backend.fullstackbackend.model.User;

public class LoginResponse {
    String message;
    Boolean status;

    User user;
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Boolean getStatus() {
        return status;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LoginResponse(String message, Boolean status, User user) {
        this.message = message;
        this.status = status;
        this.user = user;
    }
}
