package com.example.Bus.Model.Dto;

import java.util.ArrayList;
import java.util.List;

public class Bus {
    private List<String> arriveBusNum;        // 도착하는 버스 번호
    private List<String> arriveBusFirstTime;  // 해당 버스의 첫번째 도착 예정 시간
    private List<String> arriveBusSecondTime; // 두번째 도착 예정 시간
    private List<String> arriveBusFirstNum;   // 첫번째 도착하는 버스의 차 번호판
    private List<String> arriveBusSecondNum;  // 두번째 도착하는 버스의 차 번호판
    private List<String> arriveBusDir;        // 버스의 방향
    private List<String> currentBusStop; // 현재 버스 정류장 번호
    private List<String> busRoutedId; //  현재 정류장에서의 노선 ID? 암튼 노선 ID

    private String arsId; // 정류소고유번호

    private List<String> stId; // 정류소 ID

    public String getArsId() {
        return arsId;
    }

    public void setArsId(String arsId) {
        this.arsId = arsId;
    }

    // Getter & Setter
    public List<String> getArriveBusNum() {
        return arriveBusNum;
    }

    public void setArriveBusNum(String arriveBuses) {
        this.arriveBusNum.add(arriveBuses);
    }

    public List<String> getArriveBusFirstTime() {
        return arriveBusFirstTime;
    }

    public void setArriveBusFirstTime(String arriveBusFirst) {
        this.arriveBusFirstTime.add(arriveBusFirst);
    }

    public List<String> getArriveBusSecondTime() {
        return arriveBusSecondTime;
    }

    public void setArriveBusSecondTime(String arriveBusSecond) {
        this.arriveBusSecondTime.add(arriveBusSecond);
    }

    public List<String> getArriveBusDir() {
        return arriveBusDir;
    }

    public void setArriveBusDir(String arriveBusDir) {
        this.arriveBusDir.add(arriveBusDir);
    }

    public List<String> getArriveBusFirstNum() {
        return arriveBusFirstNum;
    }

    public void setArriveBusFirstNum(String arriveBusFirstNum) {
        this.arriveBusFirstNum.add(arriveBusFirstNum);
    }

    public List<String> getArriveBusSecondNum() {
        return arriveBusSecondNum;
    }

    public void setArriveBusSecondNum(String arriveBusSecondNum) {
        this.arriveBusSecondNum.add(arriveBusSecondNum);
    }

    public List<String> getCurrentBusStop() {
        return currentBusStop;
    }

    public void setCurrentBusStop(String currentBusStop) {
        this.currentBusStop.add(currentBusStop);
    }

    public List<String> getBusRoutedId() {
        return busRoutedId;
    }

    public void setBusRoutedId(String busRoutedId) {
        this.busRoutedId.add(busRoutedId);
    }

    public List<String> getStId() {
        return stId;
    }

    public void setStId(String stId) {
        this.stId.add(stId);
    }

    public Bus(){
        this.arriveBusNum = new ArrayList<>();
        this.arriveBusFirstTime = new ArrayList<>();
        this.arriveBusSecondTime = new ArrayList<>();
        this.arriveBusDir = new ArrayList<>();
        this.arriveBusFirstNum = new ArrayList<>();
        this.arriveBusSecondNum = new ArrayList<>();
        this.currentBusStop = new ArrayList<>();
        this.busRoutedId = new ArrayList<>();
        this.stId = new ArrayList<>();
    }
}
