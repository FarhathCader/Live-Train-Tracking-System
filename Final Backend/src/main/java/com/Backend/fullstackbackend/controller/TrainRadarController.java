package com.Backend.fullstackbackend.controller;

import com.Backend.fullstackbackend.exception.RadarNotFoundException;
import com.Backend.fullstackbackend.exception.TrainNotFoundException;
import com.Backend.fullstackbackend.model.Train;
import com.Backend.fullstackbackend.model.TrainRadar;
import com.Backend.fullstackbackend.repository.TrainRadarRepository;
import com.Backend.fullstackbackend.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000/")
public class TrainRadarController {


    @Autowired
    private  TrainRadarRepository trainRadarRepository;

    @Autowired
    private TrainRepository trainRepository;



    @PostMapping("/createRadar")
    public ResponseEntity<String> createTrainRadar(@RequestBody TrainRadar radar) {
        // Validate and save the train radar data
        // You can associate the train with the radar, save it to the database, and return a respons
        TrainRadar savedRadar = trainRadarRepository.save(radar);
        return ResponseEntity.ok("Train Radar created with ID: " + savedRadar.getId());
    }


    @GetMapping("/radars")
    List<TrainRadar> getAllRadars(){
        return trainRadarRepository.findAll();
    }


    @DeleteMapping("/radar/{id}")
    String deleteRadar(@PathVariable Long id){
        if(!trainRadarRepository.existsById(id)){
            throw new TrainNotFoundException(id);
        }
        trainRadarRepository.deleteById(id);
        return "TrainRadar with id " + id + " has been deleted success";
    }
    @GetMapping("/radar/{id}")
    Train getTrainByID(@PathVariable Long id){
        return trainRepository.findById(id)
                .orElseThrow(()->new TrainNotFoundException(id));
    }


    @PutMapping("/radar/{id}")
    TrainRadar updateRadar(@RequestBody TrainRadar newRadar, @PathVariable Long id){
        return  trainRadarRepository.findById(id)
                .map(radar ->{
                    radar.setLastUpdatedStation(newRadar.getLastUpdatedStation());
                    radar.setLastUpdatedTime(newRadar.getLastUpdatedTime());
                    return trainRadarRepository.save(radar);
                }).orElseThrow(()->new RadarNotFoundException(id));
    }








}
