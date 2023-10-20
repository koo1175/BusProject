package com.example.second;

import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Entity
@Data
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 생성되는 기본 키
    @Column(name = "id")
    private Long id;
    @Column(name = "bus_num")
    private String bus_num;
    @Column(name = "bus_uid")
    private String bus_uid;
    @Column(name = "name")
    private String name;
    @Column(name = "phone_num")
    private String phone_num;
    @Column(name = "company")
    private String company;
//    @ElementCollection
//    @Column(name = "bus_stop")
//    private List<String> bus_stop;
//    @ElementCollection
//    @Column(name = "user_id")
//    private List<String> user_id;

    public Driver(){

    }

    public String getBusNum() {
        return bus_num;
    }

    public void setBusNum(String bus_num) {
        this.bus_num = bus_num;
    }

    public String getBusUid() {
        return bus_uid;
    }

    public void setBusUid(String bus_uid) {
        this.bus_uid = bus_uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone_num() {
        return phone_num;
    }

    public void setPhone_num(String phone_num) {
        this.phone_num = phone_num;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }
//
//    public List<String> getBus_stop() {
//        return bus_stop;
//    }
//
//    public void setBus_stop(String bus_stop) {
//        this.bus_stop.add(bus_stop);
//    }
//
//    public List<String> getUser_id() {
//        return user_id;
//    }
//
//    public void setUser_id(String user_id) {
//        this.user_id.add(user_id);
//    }
//
//    public Driver() {
//        this.bus_stop = new ArrayList<>();
//        this.user_id = new ArrayList<>();
//
//    }


}
