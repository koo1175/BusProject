package com.example.Bus.Controller;

import com.example.Bus.Model.Dto.DriverDto;
import com.example.Bus.Model.Dto.UserDto;
import com.example.Bus.Service.UserService;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/user/create")
    public int regist(@RequestParam(name = "user_id") String user_id,
                         @RequestParam("name") String name,
                         @RequestParam("password") String password,
                         @RequestParam("phone_num") String phone_num,
                         @RequestParam("blind") boolean blind){

        UserDto userDto = new UserDto();
        userDto.setUser_id(user_id);
        userDto.setName(name);
        userDto.setPassword(password);
        userDto.setPhone_num(phone_num);
        userDto.setBlind(blind);

        int resultCnt = userService.regist(userDto);
        return resultCnt;
    }

    @PostMapping("/user/login")
    public List<UserDto> login(@RequestParam(name = "user_id") String user_id, @RequestParam("password")String password){
        UserDto userDto = new UserDto();
        userDto.setUser_id(user_id);
        userDto.setPassword(password);

        List<UserDto> list = userService.login(userDto);
        return list;
    }

    @PostMapping("/user/update")
    public int update(@RequestParam("name") String name, @RequestParam("password") String password, @RequestParam("phoneNum") String phoneNum){
        UserDto userDto = new UserDto();
        userDto.setName(name);
        userDto.setPassword(password);
        userDto.setPhone_num(phoneNum);

        int resultCnt = userService.update(userDto);
        return resultCnt;
    }

    @PostMapping("/user/delete")
    public int delete(@RequestParam(name = "user_id") String user_id){
        UserDto userDto = new UserDto();
        userDto.setUser_id(user_id);

        int resultCnt = userService.delete(userDto);
        return resultCnt;
    }


    @GetMapping("/user/findAll")
    public HashMap<String, Object> findAll(){
        HashMap<String,Object> mv = new HashMap<>();
        List<UserDto> list = userService.findAll();
        mv.put("list", list);
        return mv;
    }

    @PostMapping("/user/checkBlind")
    public UserDto checkBlind(@RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("user_id");
        UserDto userDto = new UserDto();
        userDto.setUser_id(userId);

        UserDto resultUserDto = userService.checkBlind(userDto);
        return resultUserDto;
    }

}