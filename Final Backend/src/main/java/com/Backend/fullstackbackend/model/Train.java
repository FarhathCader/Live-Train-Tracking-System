package com.Backend.fullstackbackend.model;


import javax.persistence.*;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Entity
public class Train {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String startStation;
    private String endStation;

    @Column(name = "train_start_time")
    private LocalTime trainStartTime;

    private boolean reversed;
    // Map with station position (integer) and station name (string)
    @ElementCollection
    @CollectionTable(name = "train_destinations", joinColumns = @JoinColumn(name = "train_id"))
    @Column(name = "station_name")
    private List<String> destinations = new ArrayList<>();

    // Map with station position (integer) and station name (string) for default destinations
    @ElementCollection
    @CollectionTable(name = "train_default_destinations", joinColumns = @JoinColumn(name = "train_id"))
    @MapKeyColumn(name = "position")
    @Column(name = "station_name")
    private Map<String, Integer> defaultDestinations = new HashMap<>();

    private String trainType;

    public Train(Long id, String startStation, String endStation, LocalTime trainStartTime, boolean reversed, List<String> destinations, Map<String, Integer> defaultDestinations, String trainType) {
        this.id = id;
        this.startStation = startStation;
        this.endStation = endStation;
        this.trainStartTime = trainStartTime;
        this.reversed = reversed;
        this.destinations = destinations;
        this.defaultDestinations = defaultDestinations;
        this.trainType = trainType;
    }

    public LocalTime getTrainStartTime() {
        return trainStartTime;
    }

    public void setTrainStartTime(LocalTime trainStartTime) {
        this.trainStartTime = trainStartTime;
    }

    public void setDestinations(List<String> destinations) {
        this.destinations = destinations;
    }

    public Train() {
        defaultDestinations.put("Maradana",1);
        defaultDestinations.put("Colombo",2);
        defaultDestinations.put("Kollupitiya",3);
        defaultDestinations.put("Bambalapitiya",4);
        defaultDestinations.put("Wellawatta",5);
        defaultDestinations.put("Dehiwala",6);
        defaultDestinations.put("Mount Lavinia",7);
        defaultDestinations.put("Ratmalana",8);
        defaultDestinations.put("Moratuwa",9);
        defaultDestinations.put("Panadura",10);
        defaultDestinations.put("Wadduwa",11);
        defaultDestinations.put("Kalutara",12);
        defaultDestinations.put("Payagala",13);
        defaultDestinations.put("Beruwala",14);
        defaultDestinations.put("Aluthgama",15);
        defaultDestinations.put("Benthota",16);
        defaultDestinations.put("Kosgoda",17);
        defaultDestinations.put("Ambalangoda",18);
        defaultDestinations.put("Hikkaduwa",19);
        defaultDestinations.put("Boossa",20);
        defaultDestinations.put("Galle",21);
        defaultDestinations.put("Thalpe",22);
        defaultDestinations.put("Weligama",23);
        defaultDestinations.put("Matara",24);
        defaultDestinations.put("Beliatta",25);

    }


    public void sortDestinationsByIndex() {
        // Create a Comparator to sort destinations based on the indexes in defaultDestinations map
        Comparator<String> destinationComparator = (destination1, destination2) -> {
            int index1 = defaultDestinations.getOrDefault(destination1, Integer.MAX_VALUE);
            int index2 = defaultDestinations.getOrDefault(destination2, Integer.MAX_VALUE);
            return Integer.compare(index1, index2);
        };

        // Sort the destinations list using the comparator
        destinations.sort(destinationComparator);
    }
    public void reverseSortDestinationsByIndex() {
        sortDestinationsByIndex(); // First, sort the destinations in ascending order
        Collections.reverse(destinations); // Then, reverse the list to get a descending order
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartStation() {
        return startStation;
    }

    public void setStartStation(String startStation) {
        this.startStation = startStation;
    }

    public String getEndStation() {
        return endStation;
    }

    public void setEndStation(String endStation) {
        this.endStation = endStation;
    }



    public String getTrainType() {
        return trainType;
    }

    public void setTrainType(String trainType) {
        this.trainType = trainType;
    }

    public List<String> getDestinations() {
        return destinations;
    }

    public List<String> getDefault() {
        Set<String> keySet = getDefaultDestinations().keySet();
        List<String> stringKeys = keySet.stream()
                .map(Object::toString) // Convert each key to a String
                .collect(Collectors.toList());
        return stringKeys;

    }

    public Map<String, Integer> getDefaultDestinations() {
        return defaultDestinations;
    }

    public void setDefaultDestinations(Map<String, Integer> defaultDestinations) {
        this.defaultDestinations = defaultDestinations;
    }

    public boolean isReversed() {
        if (defaultDestinations.containsKey(startStation) && defaultDestinations.containsKey(endStation)) {
            int startValue = defaultDestinations.get(startStation);
            int endValue = defaultDestinations.get(endStation);
            reversed = endValue > startValue;
        } else {
            reversed = false; // Handle the case where start or end station is not found in defaultDestinations
        }
        return reversed;
    }




}
