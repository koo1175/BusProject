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

    private static String UPLOADED_FOLDER = "/Users/songdongjun/Desktop/BusProject/voice/";

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

//        String busRouteId = convertVoiceToBusRouteId(voiceResult); // voiceResult는 음성 인식 결과
//        BusStop busStop = controller.getArrInfoByRouteAllList(busRouteId);

        return temp;
    }

    //    public void convertM4AToPCM(String sourcePath, String targetPath) {
//        try {
//            Runtime runtime = Runtime.getRuntime();
//            Process process = runtime.exec(new String[]{"/bin/bash", "ffmpeg_converter.sh", sourcePath, targetPath});
//            process.waitFor();  // Wait for the process to finish.
//            System.out.println("변환 완료.");
//        } catch (IOException | InterruptedException e) {
//
//            e.printStackTrace();
//
//        }
//    }
    public void convertM4AToPCM(String sourcePath, String targetPath) {
        try {
            // Build the FFmpeg command for conversion
            String[] cmd = {"ffmpeg", "-i", sourcePath, "-acodec", "pcm_s16le", "-f", "s16le", "-ac", "1", "-ar", "16000", targetPath};
            ProcessBuilder processBuilder = new ProcessBuilder(cmd);
            Process process = processBuilder.start();

            // Wait for the process to finish
            process.waitFor();
            System.out.println("변환 완료.");
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

