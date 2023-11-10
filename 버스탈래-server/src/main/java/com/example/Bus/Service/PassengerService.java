package com.example.Bus.Service;

import com.example.Bus.Model.Dto.DriverDto;
import com.example.Bus.Model.Dto.PassengerDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


public interface PassengerService {

    int regist(PassengerDto passengerDto);

    int update(PassengerDto passengerDto);

    int delete(PassengerDto passengerDto);

    List<PassengerDto> findSearch(PassengerDto passengerDto);

}