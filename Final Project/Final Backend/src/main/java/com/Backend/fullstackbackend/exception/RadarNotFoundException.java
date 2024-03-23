package com.Backend.fullstackbackend.exception;


public class RadarNotFoundException extends RuntimeException {
    public RadarNotFoundException(Long id){
        super("Could not found the train with id "+ id);
    }
}
