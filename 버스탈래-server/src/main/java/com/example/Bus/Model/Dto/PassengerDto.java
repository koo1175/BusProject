package com.example.Bus.Model.Dto;

public class PassengerDto {

    // 버스 정류장 시작 지점 이름
    private String start;

    // 버스 번호판 uid
    private String bus_uid;

    // 유저의 아이디
    private String user_id;

    // 버스 도착 지점
    private String arrive;

    // start point의 routeID : 노선 아이디
    private String start_route_id;

    // end point의 routeID : 노선 아이디
    private String end_route_id;

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getBus_uid() {
        return bus_uid;
    }

    public void setBus_uid(String bus_uid) {
        this.bus_uid = bus_uid;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getArrive() {
        return arrive;
    }

    public void setArrive(String arrive) {
        this.arrive = arrive;
    }

    public String getStart_route_id() {
        return start_route_id;
    }

    public void setStart_route_id(String start_route_id) {
        this.start_route_id = start_route_id;
    }

    public String getEnd_route_id() {
        return end_route_id;
    }

    public void setEnd_route_id(String end_route_id) {
        this.end_route_id = end_route_id;
    }
}