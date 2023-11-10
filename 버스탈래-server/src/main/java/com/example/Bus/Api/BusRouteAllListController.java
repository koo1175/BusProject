package com.example.Bus.Api;

import com.example.Bus.Model.Dto.BusStop;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

//@CrossOrigin(origins = "http://bus-project.kro.kr/") // 리액트 네이티브와 스프링 부트의 포트를 통일하기 위함
@RestController
public class BusRouteAllListController {

    // 해당 버스 노선 전체를 조회한다.
    @GetMapping("/getArrInfoByRouteAll")
    public BusStop getArrInfoByRouteAllList(@RequestParam String busRouteId) throws IOException {
        BusStop busStop = new BusStop();
        // http://localhost:8080/getArrInfoByRouteAll?busRouteId=100100118 형식으로 사용
        StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=0Fdhoh8PtruSsgs%2FDtWVvlxqcjTWEI7QPfeDB1SwDPbX311RBVfaatvVkZvZRum3gM0QwziF2OJts4FG11Y1uw%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("busRouteId","UTF-8") + "=" + URLEncoder.encode(busRouteId, "UTF-8")); /*노선ID*/
        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;

        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            // XML 데이터 파싱 및 출력
            busStop = getData(url);
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        rd.close();
        conn.disconnect();

        return busStop;
    }

    public static BusStop getData(URL url) {
        List<BusStop> busStops = new ArrayList<>();
        BusStop busStop = new BusStop();

        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(url.openStream());

            // root tag
            doc.getDocumentElement().normalize();
            System.out.println("Root element: " + doc.getDocumentElement().getNodeName());

            // 파싱할 tag
            NodeList nList = doc.getElementsByTagName("itemList");
            System.out.println("파싱할 리스트 수: " + nList.getLength());

            String previousStationName = null; // 이전 정류소명을 저장하기 위한 변수

            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;

                    String stationName = eElement.getElementsByTagName("stNm").item(0).getTextContent();
                    String busRouteId = eElement.getElementsByTagName("busRouteId").item(0).getTextContent();
                    String plainNo1 = eElement.getElementsByTagName("plainNo1").item(0).getTextContent();
                    String stId = eElement.getElementsByTagName("stId").item(0).getTextContent();
                    // 현재 정류소명과 이전 정류소명 비교
                    if (stationName != null && !stationName.equals(previousStationName)) {
                        System.out.println("정류소명: " + stationName);
                        System.out.println("정류소 노선ID: " + busRouteId);
                        System.out.println("첫번째 도착 버스 번호: " + plainNo1);
                        System.out.println("정류소 ID : " + stId);
                        previousStationName = stationName;

                        // BusStop 객체를 생성하고 정류소명, 노선ID, 번호를 설정한 뒤 리스트에 추가
                        busStop.setStationNames(stationName);
                        busStop.setBusRouteId(busRouteId);
//                        busStop.setBusNum(plainNo1);
//                        busStop.setRouteId();
//                        busStops.setBusNum();
                        busStops.add(busStop);
                    } else {
                        break;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return busStop;
    }
}