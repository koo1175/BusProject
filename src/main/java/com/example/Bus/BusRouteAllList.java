package com.example.Bus;

// 경유노선 전체 정류소 도착예정정보를 조회한다
// 변수: BusRouteId(노선 ID)

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
public class BusRouteAllList {
    @GetMapping("/getArrInfoByRouteAll")
    public void getArrInfoByRouteAllList(@RequestParam String busRouteId) throws IOException {
        StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=t2qs2a1o15tXR1NhKWY%2FTplsMnvey2e3kTFt8BIlR8dJ6JsaALNvYI6%2B5dKPSJbl%2FJ9C0dF7%2Boi2NwGJKHikSQ%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("busRouteId","UTF-8") + "=" + URLEncoder.encode(busRouteId, "UTF-8")); /*노선ID*/
        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;

        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            System.out.println("!@@!@!@!");
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
