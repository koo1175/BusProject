package com.example.Bus.Service;

import com.example.Bus.Model.Dto.PassengerDto;
import com.example.Bus.Model.Mapper.PassengerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerServiceImpl implements PassengerService {

    @Autowired
    private PassengerMapper passengerMapper;

    @Override
    public int regist(PassengerDto passengerDto){return passengerMapper.regist(passengerDto);}

    @Override
    public int update(PassengerDto passengerDto) {
        return passengerMapper.update(passengerDto);
    }

    @Override
    public int delete(PassengerDto passengerDto) { return passengerMapper.delete(passengerDto); }

    @Override
    public List<PassengerDto> findSearch(PassengerDto passengerDto) { return passengerMapper.findSearch(passengerDto); }

}
