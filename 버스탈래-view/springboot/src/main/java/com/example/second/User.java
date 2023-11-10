package com.example.second;

import jakarta.persistence.*;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import lombok.Data;

@Entity
@Data
public class User {

    @Id // Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 생성되는 기본 키
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private String user_id;
    @Column(name = "name")
    private String name;
    @Column(name = "password")
    private String password;
    @Column(name = "phone_num")
    private String phone_num;
    @Column(name = "destination")
    private String destination;

    public User(String user_id, String name, String password, Boolean ride_or_getoff, String phone_num, String destination){
        this.user_id = user_id;
        this.name = name;
        this.password = password;
        this.phone_num = phone_num;
        this.destination = destination;
    }

    public User() {

    }

    public String getUserId() {
        return user_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNum() {
        return phone_num;
    }

    public void setPhoneNum(String phone_num) {
        this.phone_num = phone_num;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
