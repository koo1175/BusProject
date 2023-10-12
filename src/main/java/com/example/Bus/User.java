package com.example.Bus;

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
    @Column(name = "ride_or_getoff")
    private boolean ride_or_getoff;
    @Column(name = "phone_num")
    private String phone_num;
    @Column(name = "voice") // 오디오 파일을 저장하기 위한 컬럼
    private  byte[] voice;

    public User(String user_id, String name, String password, Boolean ride_or_getoff, String phone_num, byte[] voice){
        this.user_id = user_id;
        this.name = name;
        this.password = password;
        this.ride_or_getoff = ride_or_getoff;
        this.phone_num = phone_num;
        this.voice = voice;
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

    public Boolean getRideORgetOff() {
        return ride_or_getoff;
    }

    public void setRideORgetOff(Boolean ride_or_getoff) {
        this.ride_or_getoff = ride_or_getoff;
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

    public void setVoice(byte[] voice){
        this.voice = voice;
    }

    public byte[] getVoice() {return voice;}
}
