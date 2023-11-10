package com.example.Bus.Service;

import com.example.Bus.Model.Dto.UserDto;

import java.util.List;

public interface UserService {

    int regist(UserDto userDto);

    int update(UserDto userDto);

    int delete(UserDto userDto);

    List<UserDto> findAll();

    List<UserDto> findSearch(UserDto userDto);

    List<UserDto> login(UserDto userDto);

    UserDto checkBlind(UserDto userDto);

}
