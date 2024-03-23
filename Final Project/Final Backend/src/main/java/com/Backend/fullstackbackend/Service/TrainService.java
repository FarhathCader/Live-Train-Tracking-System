package com.Backend.fullstackbackend.Service;

import com.Backend.fullstackbackend.model.Train;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TrainService {


    List<Train> getAllTrains();

    Train getTrainById(Long id);

    Train createTrain(Train train);

    Train updateTrain(Long id, Train train);

    void deleteTrain(Long id);


}
