package com.example.Bus;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CheckBlindController {

    private final UserRepository userRepository;

    public CheckBlindController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/api/checkBlind/{userId}")
    public boolean checkBlind(@PathVariable String userId) {
        return userRepository.checkBlind(userId);
    }
}