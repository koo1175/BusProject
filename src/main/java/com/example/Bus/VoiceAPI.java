package com.example.Bus;

import com.google.gson.Gson;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class VoiceAPI {
    @PostMapping("/Voice")
    public String voiceRecognition(
            byte[] voice) {

        test t = new test();
        String temp = t.applySTTToAudioSegments("//Users//songdongjun//Downloads//BusProject-- 2//voice//hello.wav");
        System.out.println("123123123:" + temp);
        return temp;
    }

}
