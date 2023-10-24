package com.example.Bus;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class getVoice_Android {

    private static String UPLOADED_FOLDER = "C:/Users/IdealProjects/server_ver3.0/second/src/recordingVoice/";

    @PostMapping("/Voice_Android")
    public String voiceRecognition(@RequestParam("userId") String userId,
                                   @RequestParam("audio") MultipartFile audioFile) {
        if (audioFile.isEmpty()) {
            return "Please select a file to upload";
        }

        try {
            // 파라미터로 받은 파일을 폴더에 저장
            byte[] bytes = audioFile.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + audioFile.getOriginalFilename());
            Files.write(path, bytes);

            // m4a -> pcm 파일로 바꾼 데이터 저장 경로
            convertM4AToPCM(UPLOADED_FOLDER + audioFile.getOriginalFilename(), UPLOADED_FOLDER + "converted_" + audioFile.getOriginalFilename());
        } catch (IOException e) {
            e.printStackTrace();
        }

        RunAPI t = new RunAPI();
        String temp = t.applySTTToAudioSegments(UPLOADED_FOLDER + "converted_" + audioFile.getOriginalFilename());
        System.out.println("결과:" + temp);

        // JSON 파싱: "recognized"의 값을 추출
        JsonElement jsonElement = JsonParser.parseString(temp);
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        String recognizedText = jsonObject.get("return_object").getAsJsonObject().get("recognized").getAsString();

        // 마침표가 문자열의 끝에 있는 경우만 제거
        if (recognizedText.endsWith(".")) {
            recognizedText = recognizedText.substring(0, recognizedText.length() - 1);
        }

        return recognizedText;
    }

    public void convertM4AToPCM(String sourcePath, String targetPath) {

        try {
            Runtime runtime = Runtime.getRuntime();
            Process process = runtime.exec(new String[]{"C:/ffmpeg-2023-10-12-git-a7663c9604-essentials_build/bin/ffmpeg.exe", "-i", sourcePath, "-acodec", "pcm_s16le", "-f", "s16le", "-ac", "1", "-ar","16000",targetPath});
            process.waitFor();  // Wait for the process to finish.
            System.out.println("변환 완료.");

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        //System.out.println("변환 완료.");
    }
}
