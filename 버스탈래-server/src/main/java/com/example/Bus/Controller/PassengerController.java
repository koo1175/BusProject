package com.example.Bus.Controller;

import com.example.Bus.Model.Dto.DriverDto;
import com.example.Bus.Model.Dto.PassengerDto;
import com.example.Bus.Service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class PassengerController {

    @Autowired
    private PassengerService passengerService;

    // 타겠다 유저가 요청
    @PostMapping("/passenger/ride")
    public int ride(@RequestParam(name = "bus_uid")String bus_uid,
                     @RequestParam(name = "start")String start,
                     @RequestParam(name = "start_route_id")String start_route_id,
                     @RequestParam(name = "user_id")String user_id,
                     @RequestParam(name = "arrive")String arrive,
                     @RequestParam(name = "end_route_id")String end_route_id){

        PassengerDto passengerDto = new PassengerDto();
        passengerDto.setStart(start);
        passengerDto.setBus_uid(bus_uid);
        passengerDto.setUser_id(user_id);
        passengerDto.setArrive(arrive);
        passengerDto.setStart_route_id(start_route_id);
        passengerDto.setEnd_route_id(end_route_id);

        int resultCnt = passengerService.regist(passengerDto);

        if(resultCnt == 1){
            System.out.println(user_id + "님 " + " 탑승 등록 완료 " + arrive+" 정류장 하차예정");
            return resultCnt;
        }else{
            return resultCnt;
        }
    }

    // 탑승자 수정
    @PostMapping("/passenger/update")
    public int update(@RequestParam(name = "bus_uid")String bus_uid,
                      @RequestParam(name = "start")String start,
                      @RequestParam(name = "start_route_id")String start_route_id,
                      @RequestParam(name = "user_id")String user_id,
                      @RequestParam(name = "arrive")String arrive,
                      @RequestParam(name = "end_route_id")String end_route_id) {

        PassengerDto passengerDto = new PassengerDto();
        passengerDto.setStart(start);
        passengerDto.setStart_route_id(start_route_id);
        passengerDto.setBus_uid(bus_uid);
        passengerDto.setUser_id(user_id);
        passengerDto.setArrive(arrive);
        passengerDto.setEnd_route_id(end_route_id);

        int resultCnt = passengerService.update(passengerDto);

        if(resultCnt == 1){
            System.out.println("passenger update 성공");
            return resultCnt;
        }
        else{
            System.out.println("passenger update 실패");
            return resultCnt;
        }
    }

    // 타는 버스 번호판에 해당하는 기사님에게 탑승객 정보를 리턴해준다.
    @PostMapping("/passenger/getInfo")
    public HashMap<String,Object> passengers(@RequestParam("bus_uid")String bus_uid) {
        HashMap<String,Object> mv = new HashMap<>();
        PassengerDto passengerDto = new PassengerDto();
        passengerDto.setBus_uid(bus_uid);

        List<PassengerDto> list = passengerService.findSearch(passengerDto);
        mv.put("list", list);

        return mv;
    }

    // 내리겠다
    @PostMapping("/passenger/getOff")
    public int getOff(@RequestParam(name = "user_id") String user_id){
        PassengerDto passengerDto = new PassengerDto();
        passengerDto.setUser_id(user_id);
        int resultCnt = passengerService.delete(passengerDto);

        return resultCnt;
    }
}
