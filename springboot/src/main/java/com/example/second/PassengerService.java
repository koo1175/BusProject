package com.example.second;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PassengerService {
    private final PassengerRepository passengerRepository;

    // 유저 등록
    public String save(Passenger passenger){
        passengerRepository.save(passenger);
        return passenger.getBus_uid();
    }

    // 이미 내가 등록해놓은게 있다면 update 되도록
    public String update(String user_id, String start, String start_route_id, String bus_uid, String end, String end_route_id){
        Passenger updatePassenger = passengerRepository.findByUserId(user_id);
        updatePassenger.setStart(start);
        updatePassenger.setStart_route_id(start_route_id);
        updatePassenger.setBus_uid(bus_uid);
        updatePassenger.setEnd(end);
        updatePassenger.setEnd_route_id(end_route_id);

        passengerRepository.save(updatePassenger);
        return updatePassenger.getBus_uid();
    }
    public Passenger findByID(Integer id){
        return passengerRepository.findByID(id);
    }
    public Passenger findByUserId(String userId){
        return passengerRepository.findByUserId(userId);
    }

    public long countPassengers(){
        return passengerRepository.countPassengers();
    }

    // 버스 번호판 으로 유저 검색
    public Passenger findByUid(String busUid){
        return passengerRepository.findByUid(busUid);
    }
}
