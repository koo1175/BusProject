package com.example.Bus;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class AskToDriver {
    private final DriverService driverService;

    // 버스 번호와 버스 차 번호판으로 해당 버스 기사님에게 요청하기 위한 메서드
    private boolean isValidBus(String bus_num, String bus_uid) {

        // 해당 유저가 존재할 때
        if(!Objects.equals(driverService.findByNum(bus_num).toString(), "")){
            Driver d = driverService.findByNum(bus_num);
            String uid = d.getBusUid();
            return bus_uid.equals(uid);
        }else{
            return false;
        }
    }

    @GetMapping("/driver/ride")
    public String ride(@RequestParam(name = "bus_num") String bus_num, @RequestParam("bus_uid")String bus_uid){
        // 버스 번호, 번호판
        if(isValidBus(bus_num, bus_uid)){
            return "완료";
        }else{
            return "실패";
        }
    }
}
