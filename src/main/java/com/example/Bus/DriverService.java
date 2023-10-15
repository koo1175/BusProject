package com.example.Bus;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class DriverService {
    private final DriverRepository driverRepository;

    // 버스 번호로 유저 검색
    public Driver findByNum(String busNum){
        return driverRepository.findByNum(busNum);
    }

    // 버스 번호판 으로 유저 검색
    public Driver findByUid(String busUid){
        return driverRepository.findByUid(busUid);
    }

}
