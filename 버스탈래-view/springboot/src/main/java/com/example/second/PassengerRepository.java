package com.example.second;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PassengerRepository {
    private final EntityManager em;

    // Create, Update
    public void save(Passenger passenger){
        em.persist(passenger);
    }

    // Read : 버스 번호판으로 찾기
    public Passenger findByUid(String findBusUid){
        return em.createQuery("SELECT p FROM Passenger p WHERE p.bus_uid = :findBusUid", Passenger.class)
                .setParameter("findBusUid", findBusUid)
                .getSingleResult();
    }
    // 유저 아이디로 찾기( 중복 등록 금지 유효성 검사 )
    public Passenger findByUserId(String findUserId){
        try {
            return em.createQuery("SELECT p FROM Passenger p WHERE p.user_id = :findUserId", Passenger.class)
                    .setParameter("findUserId", findUserId)
                    .getSingleResult();
        } catch (NoResultException ex) {
            // 처리할 작업 (예: 로깅 또는 기본값 반환)
            return null; // 또는 다른 적절한 처리
        }
    }

    public Passenger findByID(Integer findID){
        try {
            return em.createQuery("SELECT p FROM Passenger p WHERE p.id = :findID", Passenger.class)
                    .setParameter("findID", findID)
                    .getSingleResult();
        } catch (NoResultException ex) {
            // 처리할 작업 (예: 로깅 또는 기본값 반환)
            return null; // 또는 다른 적절한 처리
        }
    }
    // Count : 데이터의 갯수를 불러오기
    public long countPassengers() {
        Query query = em.createQuery("SELECT COUNT(p) FROM Passenger p");
        return (long) query.getSingleResult();
    }
}
