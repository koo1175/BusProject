package com.example.Bus;

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
    public String update(String user_id, String bus_stop, String bus_uid, String destination){
        Passenger updatePassenger = passengerRepository.findByUserId(user_id);
        updatePassenger.setBus_stop(bus_stop);
        updatePassenger.setBus_uid(bus_uid);
        updatePassenger.setDestination(destination);

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
