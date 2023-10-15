package com.example.Bus;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@RestController
@RequiredArgsConstructor
public class SaveVoice {

//    public interface busPJ extends JpaRepository<User, Long> {
//    }

    @Autowired
    private final UserRepository userRepository;
    private final UserService userService;
    private final VoiceAPI voiceAPI;
    //private final User user;

    @PostMapping("/saveVoice")
    public void saveVoice(@RequestParam("userId") String userId, @RequestParam("audio") MultipartFile file) {
        try {
            byte[] voiceBytes =  file.getBytes();
            String fileRealName = file.getOriginalFilename();

            /*User u = userService.findByUserId(userId);
            Long id = u.getId();

            u.setVoice(voiceBytes);  // Assuming setVoice accepts byte array*/

            userService.updateVoice(userId, voiceBytes);
//
//            Optional<busPJ> entity = busPJ.findById(ID);
//            if (entity.isPresent()) {
//                String voicePath = entity.get().getVoice();
//            }

            // API호출
            voiceAPI.voiceRecognition(voiceBytes);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}