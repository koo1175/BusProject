package com.example.Bus.Model.Dto;

public class DriverDto {

    // 버스 번호(173번 버스)
    private String bus_num;

    // 차량 번호(79허 8374)(password)
    private String bus_uid;

    // 운전자 이름
    private String name;

    // 운전자 전화번호(id)
    private String phone_num;

    // 운전 회사
    private String company;


    public String getBus_num() {
        return bus_num;
    }

    public void setBus_num(String bus_num) {
        this.bus_num = bus_num;
    }

    public String getBus_uid() {
        return bus_uid;
    }

    public void setBus_uid(String bus_uid) {
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
}