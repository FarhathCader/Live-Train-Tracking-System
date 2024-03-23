package com.Backend.fullstackbackend.controller;

import com.Backend.fullstackbackend.Response.LoginResponse;
import com.Backend.fullstackbackend.Service.UserService;
import com.Backend.fullstackbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/* Created by Arjun Gautam */
@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.isUsernameTaken(user.getUsername())) {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }

        if (userService.isEmailTaken(user.getEmail())) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        // If both username and email are not taken, proceed with saving the user to the database
        userService.saveUser(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user)
    {
        LoginResponse loginResponse = userService.loginUser(user);
        return ResponseEntity.ok(loginResponse);
    }







}
