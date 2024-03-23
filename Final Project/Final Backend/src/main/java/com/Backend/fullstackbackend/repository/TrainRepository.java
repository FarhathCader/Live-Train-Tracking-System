package com.Backend.fullstackbackend.repository;

import com.Backend.fullstackbackend.model.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TrainRepository extends JpaRepository<Train,Long> {
    @Query("SELECT t FROM Train t WHERE t.id NOT IN (SELECT tr.trainId FROM TrainRadar tr)")
    List<Train> findAvailableTrains();




}
