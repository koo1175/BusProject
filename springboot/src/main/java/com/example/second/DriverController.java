package com.example.second;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class DriverController {
    private final DriverService driverService;
    private final PassengerService passengerService;
    // 등록된 Passenger들을 불러온다

    // 프론트로 주기 위한 데이터 클래스
    public class PassengerData {
        private List<String> passengerID;
        private List<String> passengerBusStop;
        private List<String> passengerDestination;
        public List<String> getPassengerID() {
            return passengerID;
        }

        public void setPassengerID(List<String> passengerID) {
            this.passengerID = passengerID;
        }

        public List<String> getPassengerBusStop() {
            return passengerBusStop;
        }

        public void setPassengerBusStop(List<String> passengerBusStop) {
            this.passengerBusStop = passengerBusStop;
        }

        public List<String> getPassengerDestination() {
            return passengerDestination;
        }

        public void setPassengerDestination(List<String> passengerDestination) {
            this.passengerDestination = passengerDestination;
        }
    }

    public class DriverData {
        private List<String> driverNames;
        private List<String> busNums;
        private List<String> busUids;
        private List<String> phoneNums;
        private List<String> companys;

        public List<String> getDriverNames() {
            return driverNames;
        }

        public void setDriverNames(List<String> driverNames) {
            this.driverNames = driverNames;
        }

        public List<String> getBusNums() {
            return busNums;
        }

        public void setBusNums(List<String> busNums) {
            this.busNums = busNums;
        }

        public List<String> getBusUids() {
            return busUids;
        }

        public void setBusUids(List<String> busUids) {
            this.busUids = busUids;
        }

        public List<String> getPhoneNums() {
            return phoneNums;
        }

        public void setPhoneNums(List<String> phoneNums) {
            this.phoneNums = phoneNums;
        }

        public List<String> getCompanys() {
            return companys;
        }

        public void setCompanys(List<String> companys) {
            this.companys = companys;
        }
    }

    @PostMapping("/driver/create")
    public String create(@RequestParam(name = "bus_num") String bus_num, @RequestParam("bus_uid") String bus_uid, @RequestParam("name") String name, @RequestParam("company") String company, @RequestParam("phone_num") String phone_num){
//        if(isPrimary(user_id)){
        Driver d = new Driver();
        d.setBus_uid(bus_uid);
        d.setBus_num(bus_num);
        d.setName(name);
        d.setPhone_num(phone_num);
        d.setCompany(company);

        String newUserId = driverService.save(d);
        return newUserId + "번 기사님 등록 완료";
//        }else{
//            return "이미 존재하는 아이디입니다.";
//        }
    }

    @PostMapping("/driver/all")
    public DriverData readAll(){
        DriverData dd = new DriverData();
        List<String> names = new ArrayList<>();
        List<String> busUids = new ArrayList<>();
        List<String>  busNums = new ArrayList<>();
        List<String> phoneNums = new ArrayList<>();
        List<String> companys = new ArrayList<>();

        long count = driverService.countPassengers();

        for(int i=1; i <= count; i++){
            if(driverService.findById(i) != null){
                Driver d = driverService.findById(i);
                names.add(d.getName());
                busUids.add(d.getBusUid());
                busNums.add(d.getBusNum());
                phoneNums.add(d.getPhone_num());
                companys.add(d.getCompany());
            }
            else{
                System.out.println("else문에 들어왔습니다.");
            }
        }
        dd.setDriverNames(names);
        dd.setBusNums(busNums);
        dd.setBusUids(busUids);
        dd.setPhoneNums(phoneNums);
        dd.setCompanys(companys);

//        dd.setDriverNames();


        return dd;
    }

    // 전달받은 bus_uid 값으로 특정 버스 기사님 정보 전달해주기
    @PostMapping("/driver/detail")
    public Driver detailDriver(@RequestParam(name = "bus_uid")String bus_uid){
        Driver d;
        d = driverService.findByUid(bus_uid);
        return d;
    }

    // driver 로그인
    @PostMapping("/driver/login")
    public String login(@RequestParam(name = "phone_num") String phone_num, @RequestParam("bus_uid")String bus_uid){
        if(isValidDriver(phone_num, bus_uid)){
            return "로그인 완료";
        }else{
            return "휴대전화번호 또는 버스 번호판이 일치하지 않습니다.";
        }
    }

    // 아이디와 비밀번호 검증을 위한 메서드
    private boolean isValidDriver(String phone_num, String bus_uid) {

        // 등록되어있는(인증받은) 기사님과 일치할 때
        if(!Objects.equals(driverService.findByUid(bus_uid).toString(), "")){
            Driver d = driverService.findByUid(bus_uid);
            String p = d.getPhone_num();

            return phone_num.equals(p);
        }else{

            return false;
        }
    }

    private boolean isValidPassenger(String user_id, String start, String start_route_id, String bus_uid, String end, String end_route_id){
        if(passengerService.findByUserId(user_id)!=null && !Objects.equals(passengerService.findByUserId(user_id).toString(), "")){
            // 이미 탑승 등록을 한 유저인 경우 중복 등록이 안되도록 update 처리를 해준다.

            passengerService.update(user_id, start, start_route_id, bus_uid, end, end_route_id);
            System.out.println(user_id + "님 " + end+" 정류장 하차예정");

            return false;
        }else{
            // 일치하는 승객이 없는 경우
            return true;
        }
    }

    // 타겠다 유저가 요청
    @PostMapping("/driver/ride")
    public void ride(@RequestParam(name = "bus_uid")String bus_uid,
                     @RequestParam(name = "start")String start,
                     @RequestParam(name = "start_route_id")String start_route_id,
                       @RequestParam(name = "user_id")String user_id,
                       @RequestParam(name = "end")String end,
                     @RequestParam(name = "end_route_id")String end_route_id)
    {
        if(isValidPassenger(user_id, start, start_route_id, bus_uid, end, end_route_id)){
            // 버스 번호판을 운행하는 driver를 불러온다
            Passenger p = new Passenger();
            p.setStart(start);
            p.setStart_route_id(start_route_id);
            p.setBus_uid(bus_uid);
            p.setUser_id(user_id);
            p.setEnd(end);
            p.setEnd_route_id(end_route_id);

            // 기사님 버스 정류장, 유저 아이디 리스트에 추가시켜준다.

            // 해당하는 기사님을 가져와서 입력받은 애들로 update해준다
            // driverService.update(bus_uid, bus_stop, user_id);

            // passenger에 등록
            String bus_uid_check = passengerService.save(p);
            System.out.println(user_id + "님 " + bus_uid_check+ " 탑승 등록 완료 " + end+" 정류장 하차예정");

    }
        System.out.println(user_id + "님 " + end+" 정류장 하차예정");

    }


    @PostMapping("/driver/delete")
    public void deleteDriver(@RequestParam("bus_uid")String bus_uid){
        driverService.deleteDriver(bus_uid);
        System.out.println("차량 번호 " + bus_uid + " 기사님을 삭제하였습니다.");
    }


    // 타는 버스 번호판에 해당하는 기사님에게 탑승객 정보를 리턴해준다.
    @PostMapping("/driver/getPassengers")
    public PassengerData passengers(
                            @RequestParam("bus_uid")String bus_uid){
        PassengerData pd = new PassengerData();
        List<String> passengerID = new ArrayList<>();
        List<String> passengerBusStop = new ArrayList<>();
        List<String> passengerDestination = new ArrayList<>();

        long count = passengerService.countPassengers();
        System.out.println("count:" + count);
        for(int i=1; i <= count; i++){

            System.out.println("passenger 수만큼 for문이 돌아갑니다");
            if(passengerService.findByID(i)!=null){
                Passenger p = passengerService.findByID(i);
                if(p.getBus_uid().equals(bus_uid)){
                    System.out.println("탑승객이 있습니다.");
                    System.out.println("id : "+ p.getUser_id());
                    System.out.println("탑승 장소 : "+ p.getStart());
                    System.out.println("하차 장소 : "+ p.getEnd());
                    passengerID.add(p.getUser_id());
                    passengerBusStop.add(p.getStart());
                    passengerDestination.add(p.getEnd());
                }else{
                    System.out.println("안쪽 else문에 들어왔습니다.");
                }
            }else{
                System.out.println("else문에 들어왔습니다.");
            }

        }
        pd.setPassengerID(passengerID);
        pd.setPassengerBusStop(passengerBusStop);
        pd.setPassengerDestination(passengerDestination);

        return pd;
    }

    // 기사님의 좌표기반으로 1m 안에 해당 정류장이 들어오면 delete 될 수 있도록
    @PostMapping("/driver/update")
    public void updatePassengers(
            @RequestParam("x")String x,
            @RequestParam("y")String y) throws IOException {


    }
//    @GetMapping("/driver/get/busStops")
//    public List<String> busStops(
//            @RequestParam("bus_uid")String bus_uid){
//        List<String> allP_b = new ArrayList<>();
//        Passenger uniq_p = passengerService.findByUid(bus_uid);
//        allP_b.add(uniq_p.getBus_stop());
//
//        return allP_b;
//    }

    // 내리겠다
    @PostMapping("/driver/getOff")
    public String getOff(@RequestParam(name = "user_id") String user_id,
                         @RequestParam(name = "start") String start,
                         @RequestParam(name = "start_route_id") String start_route_id,
                         @RequestParam("bus_uid")String bus_uid,
                         @RequestParam("end")String end,
                         @RequestParam("end_route_id")String end_route_id){
        // 지금 탄 버스의 다음 정류장 이름을 가져와야함..

        // 버스 번호, 번호판
        if(!isValidPassenger(user_id, start, start_route_id, bus_uid, end, end_route_id)){
            passengerService.update(user_id, start, start_route_id, bus_uid, end, end_route_id);
            return "완료";
        }else{
            return "실패";
        }
    }
}
