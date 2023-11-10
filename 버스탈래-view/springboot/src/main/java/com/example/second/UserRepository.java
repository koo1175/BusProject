package com.example.second;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.second.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final EntityManager em;

    // Create, Update
    public void save(User user){
        em.persist(user);
    }

    // Delete
    public void remove(Long id){
        em.remove(findById(id));
    }

    // Read
    public User findById(Long id){
        return em.find(User.class, id);
    }

    // 유저 이름
    public User findByName(String findName){
        return em.createQuery("SELECT u FROM User u WHERE u.name = :findName", User.class)
                .setParameter("findName", findName)
                .getSingleResult();
    }
    public User findByUserId(String findUserId){
        return em.createQuery("SELECT u FROM User u WHERE u.user_id = :findUserId", User.class)
                .setParameter("findUserId", findUserId)
                .getSingleResult();
    }

    public User findByPassword(String findPassword){
        return em.createQuery("SELECT u FROM User u WHERE u.password = :findPassword", User.class)
                .setParameter("findPassword", findPassword)
                .getSingleResult();
    }

    public List<User> findAll() {
        return em.createQuery("SELECT u FROM User u", User.class)
                .getResultList();
    }


//    Optional<User> findByUsername(String name);


}
