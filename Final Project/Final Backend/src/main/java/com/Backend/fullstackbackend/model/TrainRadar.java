package com.Backend.fullstackbackend.model;

import javax.persistence.*;
import java.time.LocalTime;


@Entity
public class TrainRadar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String lastUpdatedStation;

    @Column(name = "train_updated_time")
    private LocalTime lastUpdatedTime;

    private Long trainId;

    public TrainRadar(Long id, String lastUpdatedStation, LocalTime lastUpdatedTime, Long trainId) {
        this.id = id;
        this.lastUpdatedStation = lastUpdatedStation;
        this.lastUpdatedTime = lastUpdatedTime;
        this.trainId = trainId;
    }

    public TrainRadar() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastUpdatedStation() {
        return lastUpdatedStation;
    }

    public void setLastUpdatedStation(String lastUpdatedStation) {
        this.lastUpdatedStation = lastUpdatedStation;
    }

    public LocalTime getLastUpdatedTime() {
        return lastUpdatedTime;
    }

    public void setLastUpdatedTime(LocalTime lastUpdatedTime) {
        this.lastUpdatedTime = lastUpdatedTime;
    }

    public Long getTrainId() {
        return trainId;
    }

    public void setTrainId(Long trainId) {
        this.trainId = trainId;
    }








}
