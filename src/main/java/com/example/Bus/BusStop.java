package com.example.Bus;
import java.util.*;

public class BusStop {

    private List<String> stationNames;

    private List<String> nearStationNames;
    private List<String> nearStationUIDs;

    // Getter & Setter
    public List<String> getStationNames(){
        return stationNames;
    }

    public void setStationNames(String stationName){
        this.stationNames.add(stationName);
    }

    public List<String> getNearStationName() {
        return nearStationNames;
    }

    public void setNearStationName(String nearStationName) {
        if (nearStationNames.size() < 5) {
            nearStationNames.add(nearStationName);
        } else {
            // 5개의 항목만 허용하려면 추가할 수 없음
            throw new IllegalStateException("최대 5개 항목까지만 허용됩니다.");
        }
    }

    public List<String> getNearStationUIDs() {
        return nearStationUIDs;
    }

    public void setNearStationUIDs(String nearStationUID) {
        if (nearStationUIDs.size() < 5) {
            nearStationUIDs.add(nearStationUID);
        } else {
            // 5개의 항목만 허용하려면 추가할 수 없음
            throw new IllegalStateException("최대 5개 항목까지만 허용됩니다.");
        }
    }

    public BusStop(){
        this.stationNames = new ArrayList<>();
        this.nearStationNames = new ArrayList<>();
        this.nearStationUIDs = new ArrayList<>();
    }
}
