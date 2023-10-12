//package com.example.Bus;
//
//import com.google.gson.Gson;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//import java.io.DataOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.net.HttpURLConnection;
//import java.net.MalformedURLException;
//import java.net.URL;
//import java.util.Base64;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//public class VoiceAPI2 {
//    @PostMapping("/Voice")
//    public String voiceRecognition(
//            @RequestParam("languageCode") String languageCode,
//            @RequestParam("audioFile") MultipartFile audioFile) {
//        // 실제 API 엔드포인트 URL로 변경
//        String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Recognition";
//        // 실제 API 액세스 키로 교체
//        String accessKey = "YOUR_ACCESS_KEY";
//        String audioContents = null;
//        try {
//            // 오디오 파일을 Base64로 인코딩
//            byte[] audioBytes = audioFile.getBytes();
//            audioContents = Base64.getEncoder().encodeToString(audioBytes);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "ERROR: " + e.getMessage();
//        }
//
//        Gson gson = new Gson();
//
//        Map<String, Object> request = new HashMap<>();
//        Map<String, String> argument = new HashMap<>();
//
//        // languageCode 파라미터 사용
//        argument.put("language_code", languageCode);
//        argument.put("audio", audioContents);
//
//        // 액세스 키 파라미터 사용
//        request.put("access_key", accessKey);
//        request.put("argument", argument);
//
//        URL url;
//        Integer responseCode = null;
//        String responseBody = null;
//        try {
//            // API 엔드포인트로 POST 요청 보내기
//            url = new URL(openApiURL);
//            HttpURLConnection con = (HttpURLConnection) url.openConnection();
//            con.setRequestMethod("POST");
//            con.setDoOutput(true);
//            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
//            con.setRequestProperty("Authorization", "Bearer " + accessKey);
//
//            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
//            wr.write(gson.toJson(request).getBytes("UTF-8"));
//            wr.flush();
//            wr.close();
//
//            // API 응답 처리
//            responseCode = con.getResponseCode();
//            InputStream is = con.getInputStream();
//            byte[] buffer = new byte[is.available()];
//            int bytesRead = is.read(buffer);
//            responseBody = new String(buffer);
//
//            System.out.println("[responseCode] " + responseCode);
//            System.out.println("[responseBody]");
//            System.out.println(responseBody);
//        } catch (MalformedURLException e) {
//            e.printStackTrace();
//            return "ERROR: " + e.getMessage();
//        } catch (IOException e) {
//            e.printStackTrace();
//            return "ERROR: " + e.getMessage();
//        }
//
//        return responseBody;
//    }
//}
//
