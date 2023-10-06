package com.example.second;
import java.util.*;

public class BusStop {
    private String stationNames;

    private String nearStationName;

    public String getStationNames(){
        return stationNames;
    }
    public void setStationNames(String stationName){
        this.stationNames = stationName;
    }

    public String getNearStationName() {
        return nearStationName;
    }

    public void setNearStationName(String nearStationName) {
        this.nearStationName = nearStationName;
    }
}
