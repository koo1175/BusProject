package com.example.Bus.Service;

import com.example.Bus.Model.Dto.DriverDto;
import com.example.Bus.Model.Mapper.DriverMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverMapper driverMapper;

    @Override
    public int regist(DriverDto driverDto){return driverMapper.regist(driverDto);}

    @Override
    public int update(DriverDto driverDto) {
        return driverMapper.update(driverDto);
    }

    @Override
    public int delete(DriverDto driverDto) {
        return driverMapper.delete(driverDto);
    }

    @Override
    public List<DriverDto> findAll() { return driverMapper.findAll(); }

    @Override
    public List<DriverDto> findSearch(DriverDto driverDto) { return driverMapper.findSearch(driverDto); }

    @Override
    public List<DriverDto> login(DriverDto driverDto) { return driverMapper.login(driverDto); }
}
