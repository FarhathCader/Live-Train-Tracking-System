package com.Backend.fullstackbackend.controller;


import com.Backend.fullstackbackend.exception.TrainNotFoundException;
import com.Backend.fullstackbackend.model.Train;
import com.Backend.fullstackbackend.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
public class TrainController {

    @Autowired
    private TrainRepository trainRepository;

    Train tr = new Train();


    @PostMapping("/addTrain")
    Train newTrain(@RequestBody Train newTrain){
        List k = newTrain.getDestinations();
        k.add(newTrain.getStartStation());
        k.add(newTrain.getEndStation());
        newTrain.setDestinations(k);

        if(!newTrain.isReversed()){
            newTrain.reverseSortDestinationsByIndex();
        }else{
            newTrain.sortDestinationsByIndex();

        }
        return trainRepository.save(newTrain);   }



    @GetMapping("/trains")
    List<Train> getAllTrains(){
        return trainRepository.findAll();
    }


    @GetMapping("/defaultDest")
    List<String> getDefaultDests(){
        List<String> stationNames = new ArrayList<>(tr.getDefaultDestinations().keySet());

        stationNames.sort(Comparator.comparing(tr.getDefaultDestinations()::get));
        return stationNames;
    }


    @GetMapping("/train/{id}")
    Train getTrainByID(@PathVariable Long id){
        return trainRepository.findById(id)
                .orElseThrow(()->new TrainNotFoundException(id));
    }

    @PutMapping("/train/{id}")
    Train updateTrain(@RequestBody Train newTrain,@PathVariable Long id){
        return  trainRepository.findById(id)
                .map(train ->{
                    train.setTrainType(newTrain.getTrainType());
                    train.setTrainStartTime(newTrain.getTrainStartTime());
                    train.setStartStation(newTrain.getStartStation());
                    train.setEndStation(newTrain.getEndStation());
                    train.setDestinations(newTrain.getDestinations());
                    List k = train.getDestinations();
                    k.add(train.getStartStation());
                    k.add(train.getEndStation());
                    train.setDestinations(k);

                    if(!train.isReversed()){
                        train.reverseSortDestinationsByIndex();
                    }else{
                        train.sortDestinationsByIndex();

                    }

                    return trainRepository.save(train);
                }).orElseThrow(()->new TrainNotFoundException(id));
    }

    @DeleteMapping("/train/{id}")
    String deleteTrain(@PathVariable Long id){
        if(!trainRepository.existsById(id)){
            throw new TrainNotFoundException(id);
        }
        trainRepository.deleteById(id);
        return "Train with id " + id + " has been deleted success";
    }

    @GetMapping("/available")
    public List<Train> getAvailableTrains() {
        List<Train> availableTrains = trainRepository.findAvailableTrains();
        return availableTrains;
    }

}
