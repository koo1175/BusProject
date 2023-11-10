package com.example.Bus.Service;

import com.example.Bus.Model.Dto.DriverDto;
import java.util.List;

public interface DriverService {

    int regist(DriverDto driverDto);

    int update(DriverDto driverDto);

    int delete(DriverDto driverDto);

    List<DriverDto> findAll();

    List<DriverDto> findSearch(DriverDto driverDto);

    List<DriverDto> login(DriverDto driverDto);

}
