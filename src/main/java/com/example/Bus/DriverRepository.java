package com.example.Bus;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DriverRepository {

    private final EntityManager em;

    // Read : 버스 번호로 찾기
    public Driver findByNum(String busNum){
        return em.find(Driver.class, busNum);
    }
    // Read : 버스 번호판으로 찾기
    public Driver findByUid(String busUid){
        return em.find(Driver.class, busUid);
    }
}
