package com.example.Bus.Model.Mapper;

import com.example.Bus.Model.Dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    int regist(UserDto userDto);

    int update(UserDto userDto);

    int delete(UserDto userDto);

    List<UserDto> findAll();

    List<UserDto> findSearch(UserDto userDto);

    List<UserDto> login(UserDto userDto);

    UserDto checkBlind(UserDto userDto);

}
