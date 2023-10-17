package com.example.Bus;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.example.Bus.Driver;

@Repository
@RequiredArgsConstructor
public class DriverRepository {

    private final EntityManager em;

    public void save(Driver d){
        em.persist(d);
    }

    // Read : 버스 번호판으로 찾기
    public Driver findByUid(String findBusUid){
        return em.createQuery("SELECT d FROM Driver d WHERE d.bus_uid = :findBusUid", Driver.class)
                .setParameter("findBusUid", findBusUid)
                .getSingleResult();
    }


}
