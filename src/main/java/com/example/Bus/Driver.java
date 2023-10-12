package com.example.Bus;

import jakarta.persistence.Column;

import java.util.*;

public class Driver {
    @Column(name = "bus_num")
    private String bus_num;
    @Column(name = "bus_uid")
    private String bus_uid;

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
}
