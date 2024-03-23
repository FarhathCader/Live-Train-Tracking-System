package com.Backend.fullstackbackend.Service;

import com.Backend.fullstackbackend.Response.LoginResponse;
import com.Backend.fullstackbackend.model.User;
import org.springframework.stereotype.Service;


@Service
public interface UserService {
    boolean isUsernameTaken(String username);
    boolean isEmailTaken(String email);
    void saveUser(User user);
    boolean authenticateUser(String usernameOrEmail, String password);

    LoginResponse loginUser(User user);

}
