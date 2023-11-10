package com.example.Bus.Model.Mapper;

import com.example.Bus.Model.Dto.DriverDto;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DriverMapper {

    int regist(DriverDto driverDto);

    int update(DriverDto driverDto);

    int delete(DriverDto driverDto);

    List<DriverDto> findAll();

    List<DriverDto> findSearch(DriverDto driverDto);

    List<DriverDto> login(DriverDto driverDto);

}
