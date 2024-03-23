package com.Backend.fullstackbackend.Impl;

import com.Backend.fullstackbackend.Response.LoginResponse;
import com.Backend.fullstackbackend.Service.UserService;
import com.Backend.fullstackbackend.model.User;
import com.Backend.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserImpl implements UserService {
    @Autowired
    private UserRepository userRepository;



    @Override
    public boolean isUsernameTaken(String username) {
        User existingUser = userRepository.findByUsername(username);
        return existingUser != null;
    }

    @Override
    public boolean isEmailTaken(String email) {
        User existingUser = userRepository.findByEmail(email);
        return existingUser != null;
    }
    @Override
    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            // If the user was not found by username, try searching by email
            user = userRepository.findByEmail(username);
        }

        if (user != null && user.getPassword().equals(password)) {
            return true; // Passwords match
        }

        return false; // Username or email not found, or password doesn't match
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public LoginResponse loginUser(User userx) {
        String msg = "";
        User user = userRepository.findByUsername(userx.getEmail());

        if (user == null) {
            // If the user was not found by username, try searching by email
            user = userRepository.findByEmail(userx.getEmail());
        }
        if (user != null) {
            String password = userx.getPassword();
            String encodedPassword = user.getPassword();

            if (password.equals(encodedPassword)) {
                Optional<User> user1 = userRepository.findOneByEmailAndPassword(userx.getEmail(), encodedPassword);
                if(user1 == null) user1 = userRepository.findOneByEmailAndPassword(userx.getUsername(), encodedPassword);
                if (user1 != null) {
                    return new LoginResponse("Login Success", true);
                } else {
                    return new LoginResponse("Login Failed", false);
                }
            } else {
                return new LoginResponse("password Not Match  "+ password +  " " + encodedPassword, false);
            }
        }else {
            return new LoginResponse("User Name or Email not exits", false);
        }
    }

    // Implement other methods specified in the UserService interface
}
