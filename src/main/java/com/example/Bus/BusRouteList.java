package com.example.Bus;
// 한 정류소의 특정노선의 도착예정정보를 조회한다
// 변수: stId(정류소 ID), busRouteId(노선 ID), ord(정류소 순번)

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;

@RestController
public class BusRouteList {
    // http://localhost:8080/getArrInfoByRoute?stId=100100016&busRouteId=113000003&ord=18
    @GetMapping("/getArrInfoByRoute")
    public static void getArrInfoByRoute(
            @RequestParam String stId,
            @RequestParam String busRouteId,
            @RequestParam String ord) throws IOException {
        StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRoute"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=t2qs2a1o15tXR1NhKWY%2FTplsMnvey2e3kTFt8BIlR8dJ6JsaALNvYI6%2B5dKPSJbl%2FJ9C0dF7%2Boi2NwGJKHikSQ%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("stId","UTF-8") + "=" + URLEncoder.encode(stId, "UTF-8")); /*정류소 고유 ID*/
        urlBuilder.append("&" + URLEncoder.encode("busRouteId","UTF-8") + "=" + URLEncoder.encode(busRouteId, "UTF-8")); /*노선 ID*/
        urlBuilder.append("&" + URLEncoder.encode("ord","UTF-8") + "=" + URLEncoder.encode(ord, "UTF-8")); /*정류소 순번*/
        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;

        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            // XML 데이터 파싱 및 출력
            XmlParsing_test.getData();
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());
    }
}
