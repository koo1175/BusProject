package com.example.Bus.Model.Mapper;

import com.example.Bus.Model.Dto.PassengerDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PassengerMapper {

    int regist(PassengerDto passengerDto);

    int update(PassengerDto passengerDto);

    int delete(PassengerDto passengerDto);

    List<PassengerDto> findSearch(PassengerDto passengerDto);

}
