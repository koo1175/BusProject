package com.example.second;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 생성되는 기본 키
    @Column(name = "id") // Primary Key
    private Integer id;
    // 버스 정류장 이름
    @Column(name = "start")
    private String start;
    // 버스 번호판 uid
    @Column(name = "bus_uid")
    private String bus_uid;
    // 유저의 아이디
    @Column(name = "user_id")
    private String user_id;
    // 내릴지 말지 boolean값
    @Column(name = "end")
    private String end;
    // start point의 routeID : 노선 아이디
    @Column(name = "start_route_id")
    private String start_route_id;
    // end point의 routeID : 노선 아이디
    @Column(name = "end_route_id")
    private String end_route_id;


    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = (start);
    }

    public String getBus_uid() {
        return bus_uid;
    }

    public void setBus_uid(String bus_uid) {
        this.bus_uid = (bus_uid);
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = (user_id);
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = (end);
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

    public Passenger(){
    }
}
