package com.example.second;

import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

//@CrossOrigin(origins = "http://bus-project.kro.kr") // 리액트 네이티브와 스프링 부트의 포트를 통일하기 위함
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @PostMapping("/user/create")
    public String create(@RequestParam(name = "user_id") String user_id, @RequestParam("name") String name, @RequestParam("password") String password, @RequestParam("phone_num") String phone_num){
//        if(isPrimary(user_id)){
            User user = new User();
            user.setUserId(user_id);
            user.setName(name);
            user.setPassword(password);
            user.setPhoneNum(phone_num);
            user.setDestination("");

            Long newUserId = userService.save(user);
            return newUserId + "번 유저 등록 완료";
//        }else{
//            return "이미 존재하는 아이디입니다.";
//        }
    }

    // 아이디와 비밀번호 검증을 위한 메서드
    private boolean isValidUser(String user_id, String password) {

        // 해당 유저가 존재할 때
        if(!Objects.equals(userService.findByUserId(user_id).toString(), "")){
            User u = userService.findByUserId(user_id);
            String p = u.getPassword();

            return password.equals(p);
        }else{

            return false;
        }
    }

    private boolean isPrimary(String user_id){

        if(!Objects.equals(userService.findByUserId(user_id).toString(), "")){
            return true;
        }else{
            // 이미 있는 아이디일 때
            return false;
        }
    }

    @PostMapping("/user/login")
    public String login(@RequestParam(name = "user_id") String user_id, @RequestParam("password")String password){
        // admin인 경우
        if(user_id.equals("admin") && password.equals("admin")){
            return "admin계정 접속";
        }else if(isValidUser(user_id, password)){
            return "로그인 완료";
        }else{
            return "아이디 또는 비밀번호가 일치하지 않습니다.";
        }
    }

    @PutMapping("/user/update/{id}")
    public String update(@PathVariable Long id, @RequestParam("name") String name, @RequestParam("password") String password, @RequestParam("phoneNum") String phoneNum){
        Long newUserId = userService.update(id, name, password, phoneNum);
        return newUserId + "번 유저 수정 완료";
    }

    @DeleteMapping("/user/delete/{id}")
    public String delete(@PathVariable Long id){
        userService.remove(id);
        return id + "번 유저 삭제 완료";
    }

    @GetMapping("/user/read/{id}")
    public String read(@RequestParam @Nullable Long id, @RequestParam("name") String name){
        if(id != null){
            return userService.findById(id).toString();
        }else{
            return userService.findByName(name).toString();
        }
    }

    @GetMapping("/user/all")
    public String readAll(){
        return userService.findAll().toString();
    }





}