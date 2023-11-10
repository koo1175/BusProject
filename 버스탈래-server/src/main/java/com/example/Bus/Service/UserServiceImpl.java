package com.example.Bus.Service;

import com.example.Bus.Model.Dto.UserDto;
import com.example.Bus.Model.Mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Override
    public int regist(UserDto userDto) { return userMapper.regist(userDto); }

    @Override
    public int update(UserDto userDto) { return userMapper.update(userDto); }

    @Override
    public int delete(UserDto userDto) { return userMapper.delete(userDto); }

    @Override
    public List<UserDto> findAll() { return userMapper.findAll(); }

    @Override
    public List<UserDto> findSearch(UserDto userDto) { return userMapper.findSearch(userDto); }

    @Override
    public List<UserDto> login(UserDto userDto) { return userMapper.login(userDto); }

    @Override
    public UserDto checkBlind(UserDto userDto) {
        return userMapper.checkBlind(userDto);
    }


//    // Create, Update
//    public void save(UserDto user){
//        em.persist(user);
//    }
//
//    // Delete
//    public void remove(Long id){
//        em.remove(findById(id));
//    }
//
//    // Read
//    public UserDto findById(Long id){
//        return em.find(UserDto.class, id);
//    }
//
//    // 유저 이름
//    public UserDto findByName(String findName){
//        return em.createQuery("SELECT u FROM User u WHERE u.name = :findName", UserDto.class)
//                .setParameter("findName", findName)
//                .getSingleResult();
//    }
//    public UserDto findByUserId(String findUserId){
//        return em.createQuery("SELECT u FROM User u WHERE u.user_id = :findUserId", UserDto.class)
//                .setParameter("findUserId", findUserId)
//                .getSingleResult();
//    }
//
//    public UserDto findByPassword(String findPassword){
//        return em.createQuery("SELECT u FROM User u WHERE u.password = :findPassword", UserDto.class)
//                .setParameter("findPassword", findPassword)
//                .getSingleResult();
//    }
//
//    public List<UserDto> findAll() {
//        return em.createQuery("SELECT u FROM User u", UserDto.class)
//                .getResultList();
//    }
//
////    Optional<User> findByUsername(String name);
//
//    public boolean checkBlind(String userId) {  // 사용자의 Id를 이용해 blind여부를 받아옴
//        UserDto user = em.createQuery("SELECT u FROM User u WHERE u.user_id = :userId", UserDto.class)
//                .setParameter("userId", userId)
//                .getSingleResult();
//
//        return user.getBlind();
//    }


}
