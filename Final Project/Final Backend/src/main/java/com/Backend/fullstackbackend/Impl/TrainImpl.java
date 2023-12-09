package com.Backend.fullstackbackend.Impl;

import com.Backend.fullstackbackend.Service.TrainService;
import com.Backend.fullstackbackend.model.Train;
import com.Backend.fullstackbackend.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class TrainImpl implements TrainService {
    @Autowired
    private TrainRepository trainRepository; // You need to create a TrainRepository

    @Override
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    @Override
    public Train getTrainById(Long id) {
        return trainRepository.findById(id).orElse(null);
    }

    @Override
    public Train createTrain(Train train) {
        return trainRepository.save(train);
    }

    @Override
    public Train updateTrain(Long id, Train train) {
        if (trainRepository.existsById(id)) {
            train.setId(id);
            return trainRepository.save(train);
        }
        return null; // Handle train not found
    }

    @Override
    public void deleteTrain(Long id) {
        trainRepository.deleteById(id);
    }
}
