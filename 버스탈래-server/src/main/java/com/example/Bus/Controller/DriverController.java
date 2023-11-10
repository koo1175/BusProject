package com.example.Bus.Controller;

import com.example.Bus.Model.Dto.DriverDto;
import com.example.Bus.Service.DriverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
public class DriverController {

    @Autowired
    private DriverService driverService;

    //로그 확인용
    Logger logger = LoggerFactory.getLogger(this.getClass());

    // driver 로그인
    @PostMapping("/driver/login")
    public List<DriverDto> login(@RequestParam(name = "phone_num") String phone_num, @RequestParam("bus_uid")String bus_uid){
        DriverDto driverDto = new DriverDto();
        driverDto.setPhone_num(phone_num);
        driverDto.setBus_uid(bus_uid);
        List<DriverDto> list = driverService.login(driverDto);

        return list;
    }

    // driver 등록
    @PostMapping("/driver/create")
    public int regist(@RequestParam(name = "bus_num") String bus_num, @RequestParam("bus_uid") String bus_uid, @RequestParam("name") String name, @RequestParam("company") String company, @RequestParam("phone_num") String phone_num){
        DriverDto driverDto = new DriverDto();
        driverDto.setBus_uid(bus_uid);
        driverDto.setBus_num(bus_num);
        driverDto.setName(name);
        driverDto.setPhone_num(phone_num);
        driverDto.setCompany(company);

        int resultCnt = driverService.regist(driverDto);
        return resultCnt;
    }

    // driver 수정
    @PostMapping("/driver/update")
    public int update(
            @RequestParam(name = "name") String name,
            @RequestParam(name = "bus_uid") String bus_uid,
            @RequestParam(name = "bus_num") String bus_num,
            @RequestParam(name = "phone_num")String phone_num,
            @RequestParam(name = "company")String company) {

        DriverDto driverDto = new DriverDto();
        driverDto.setName(name);
        driverDto.setBus_uid(bus_uid);
        driverDto.setBus_num(bus_num);
        driverDto.setPhone_num(phone_num);
        driverDto.setCompany(company);

        int resultCnt = driverService.update(driverDto);

        if(resultCnt == 1){
            System.out.println("driver update 성공");
            return resultCnt;
        }
        else{
            System.out.println("driver update 실패");
            return resultCnt;
        }
    }

    // driver 삭제
    @PostMapping("/driver/delete")
    public int delete(@RequestParam(name = "bus_uid")String bus_uid){
        DriverDto driverDto = new DriverDto();
        driverDto.setBus_uid(bus_uid);
        int resultCnt = driverService.delete(driverDto);
        System.out.println("차량 번호 " + bus_uid + " 을 가진 운전자의 데이터를 삭제하였습니다.");
        return resultCnt;
    }

    // 모든 driver 정보
    @GetMapping("/driver/all")
    public HashMap<String, Object> findAll(){
        HashMap<String,Object> mv = new HashMap<>();
        List<DriverDto> list = driverService.findAll();
        mv.put("list", list);
        return mv;
    }

    // 전달받은 bus_uid 값으로 특정 버스 기사님 정보 전달해주기
    @PostMapping("/driver/detail")
    public List<DriverDto> detailDriver(@RequestParam(name = "bus_uid")String bus_uid){
        DriverDto driverDto = new DriverDto();
        driverDto.setBus_uid(bus_uid);

        List<DriverDto> driver = driverService.findSearch(driverDto);
        return driver;
    }

}