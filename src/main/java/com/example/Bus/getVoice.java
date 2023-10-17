package com.example.Bus;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class getVoice {

    private static String UPLOADED_FOLDER = "/Users/songdongjun/Desktop/BusProject-- 3/voice";

    @PostMapping("/Voice")
    public String voiceRecognition(@RequestParam("userId") String userId,
                                   @RequestParam("audio") MultipartFile audioFile) {
        if (audioFile.isEmpty()) {
            return "Please select a file to upload";
        }

        try {
            // Get the file and save it somewhere
            byte[] bytes = audioFile.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + audioFile.getOriginalFilename());
            Files.write(path, bytes);

            // Convert the saved m4a file to PCM format
            convertM4AToPCM(UPLOADED_FOLDER + audioFile.getOriginalFilename(), UPLOADED_FOLDER + "converted_" + audioFile.getOriginalFilename());
        } catch (IOException e) {
            e.printStackTrace();
        }

        RunAPI t = new RunAPI();
        String temp = t.applySTTToAudioSegments(UPLOADED_FOLDER + "converted_" + audioFile.getOriginalFilename());
        System.out.println("결과:" + temp);

        return temp;
    }

    public void convertM4AToPCM(String sourcePath, String targetPath) {

        try {
            Runtime runtime = Runtime.getRuntime();
            Process process = runtime.exec(new String[]{"C:/ffmpeg-2023-10-12-git-a7663c9604-essentials_build/bin/ffmpeg.exe", "-i", sourcePath, "-acodec", "pcm_s16le", "-f", "s16le", "-ac", "1", "-ar","16000",targetPath});
            process.waitFor();  // Wait for the process to finish.


        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("변환 완료.");
    }
}
