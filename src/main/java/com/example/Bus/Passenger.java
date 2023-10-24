package com.example.Bus;

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
    @Column(name = "bus_stop")
    private String bus_stop;
    // 버스 번호판 uid
    @Column(name = "bus_uid")
    private String bus_uid;
    // 유저의 아이디
    @Column(name = "user_id")
    private String user_id;
    // 내릴지 말지 boolean값
    @Column(name = "destination")
    private String destination;


    public String getBus_stop() {
        return bus_stop;
    }

    public void setBus_stop(String bus_stop_name) {
        this.bus_stop = (bus_stop_name);
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

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Passenger(){
    }
}
