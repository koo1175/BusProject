package com.example.Bus;

import com.google.gson.Gson;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class RunAPI {


    public String applySTTToAudioSegments(String audioSegmentPath) {
        String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition";
        String accessKey = "8b22fe63-0e39-4d67-addd-c0af85ea78e2"; // 발급받은 API Key
        String languageCode = "korean"; // 언어 코드

        Gson gson = new Gson();
        String audioContents = null;
        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        // 오디오 데이터를 읽어 Base64로 인코딩
        try {
            File audioFile = new File(audioSegmentPath);
            byte[] audioBytes = new byte[(int) audioFile.length()];
            FileInputStream fis = new FileInputStream(audioFile);
            fis.read(audioBytes);
            fis.close();
            audioContents = Base64.getEncoder().encodeToString(audioBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }

        argument.put("language_code", languageCode);
        argument.put("audio", audioContents);

        request.put("argument", argument);

        URL url;
        String responseBody = null;

        try {
            url = new URL(openApiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setRequestProperty("Authorization", accessKey);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(gson.toJson(request).getBytes(StandardCharsets.UTF_8));
            wr.flush();
            wr.close();

            InputStream is = con.getInputStream();

            // 인코딩을 지정하여 데이터를 읽음
            InputStreamReader reader = new InputStreamReader(is, StandardCharsets.UTF_8);
            StringBuilder builder = new StringBuilder();
            char[] buffer = new char[1024];
            int bytesRead;
            while ((bytesRead = reader.read(buffer)) != -1) {
                builder.append(buffer, 0, bytesRead);
            }
            responseBody = builder.toString();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return responseBody;
    }
}