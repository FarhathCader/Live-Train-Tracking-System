package com.Backend.fullstackbackend.exception;

public class TrainNotFoundException extends RuntimeException {
    public TrainNotFoundException(Long id){
        super("Could not found the train with id "+ id);
    }
}
