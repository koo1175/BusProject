//package com.example.second;
//
//
//import jakarta.annotation.Nullable;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/user")
//@RequiredArgsConstructor
//public class UserController {
//
//    private final UserService userService;
//
//    @PostMapping("/create")
//    public String create(@RequestParam("userId") String userId, @RequestParam("name") String name, @RequestParam("password") String password, @RequestParam("phoneNum") String phoneNum){
//        User user = new User();
//        user.setUserId(userId);
//        user.setName(name);
//        user.setPassword(password);
//        user.setPhoneNum(phoneNum);
//        user.setRideORgetOff(false);
//
//        Long id = userService.save(user);
//        return id + "번 유저 등록 완료";
//    }
//
//    @PutMapping("/update/{id}")
//    public String update(@PathVariable Long id, @RequestParam("name") String name, @RequestParam("password") String password, @RequestParam("phoneNum") String phoneNum){
//        Long newId = userService.update(id, name, password, phoneNum);
//        return newId + "번 유저 수정 완료";
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public String delete(@PathVariable Long id){
//        userService.remove(id);
//        return id + "번 유저 삭제 완료";
//    }
//
//    @GetMapping("/read")
//    public String read(@RequestParam @Nullable Long id, @RequestParam("name") String name){
//        if(id != null){
//            return userService.findById(id).toString();
//        }else{
//            return userService.findByName(name).toString();
//        }
//    }
//
//    @GetMapping("/all")
//    public String readAll(){
//        return userService.findAll().toString();
//    }
//
//}
