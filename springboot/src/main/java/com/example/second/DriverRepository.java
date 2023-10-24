package com.example.second;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    // 기사님 고유 id로 찾기
    public Driver findById(Integer id){
        return em.find(Driver.class, id);
    }

    public List<Driver> findAll() {
        return em.createQuery("SELECT d FROM Driver d", Driver.class)
                .getResultList();
    }
    public List<Driver> findName() {
        return em.createQuery("SELECT d.name FROM Driver d", Driver.class)
                .getResultList();
    }
    public List<Driver> findBusUid() {
        return em.createQuery("SELECT d.bus_uid FROM Driver d", Driver.class)
                .getResultList();
    }
    public List<Driver> findBusNum() {
        return em.createQuery("SELECT d.bus_num FROM Driver d", Driver.class)
                .getResultList();
    }
    public List<Driver> findPhoneNum() {
        return em.createQuery("SELECT d.phone_num FROM Driver d", Driver.class)
                .getResultList();
    }
    public List<Driver> findCompany() {
        return em.createQuery("SELECT d.company FROM Driver d", Driver.class)
                .getResultList();
    }

    // Delete
    public void remove(String bus_uid){
        em.remove(findByUid(bus_uid));
    }


    // Count : 데이터의 갯수를 불러오기
    public long countDrivers() {
        Query query = em.createQuery("SELECT COUNT(d) FROM Driver d");
        return (long) query.getSingleResult();
    }

}
