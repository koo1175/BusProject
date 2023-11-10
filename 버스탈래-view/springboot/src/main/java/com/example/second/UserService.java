package com.example.second;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    // 유저 등록
    public Long save(User user){
        userRepository.save(user);
        return user.getId();
    }

    // 유저 수정
    public Long update(Long id, String newName, String newPhoneNum, String newPassword){
        User updateUser = userRepository.findById(id);
        updateUser.setName(newName);
        updateUser.setPhoneNum(newPhoneNum);
        updateUser.setPassword(newPassword);

        userRepository.save(updateUser); // 변경 내용을 저장

        return updateUser.getId();
    }

    // 유저 삭제
    public void remove(Long id){
        userRepository.remove(id);
    }

    // id로 유저 검색
    public User findById(Long id){
        return userRepository.findById(id);
    }

    // name 으로 유저 검색
    public User findByName(String name){
        return userRepository.findByName(name);
    }

    // user-id으로 유저 검색
    public User findByUserId(String user_id){
        return userRepository.findByUserId(user_id);
    }

    // password으로 유저 검색
    public User findByPassword(String password){
        return userRepository.findByUserId(password);
    }

    // 유저 전체 검색
    public List<User> findAll(){
        return userRepository.findAll();
    }
}
