package com.Backend.fullstackbackend.repository;

import com.Backend.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);

    Optional<User> findOneByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
