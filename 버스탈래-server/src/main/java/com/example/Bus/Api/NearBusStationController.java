package com.example.Bus.Api;

import com.example.Bus.Model.Dto.BusStop;
import org.springframework.web.bind.annotation.GetMapping;
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


@RestController
public class NearBusStationController {

    @GetMapping("/getStationByPos")
    public BusStop nearSt(String X, String Y) throws IOException {
        BusStop busStop = new BusStop();
        // http://localhost:8080/getStationByPos?X=126.9407&Y=37.56223 형태로 사용해야함
        StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/stationinfo/getStationByPos"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=t2qs2a1o15tXR1NhKWY%2FTplsMnvey2e3kTFt8BIlR8dJ6JsaALNvYI6%2B5dKPSJbl%2FJ9C0dF7%2Boi2NwGJKHikSQ%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("tmX","UTF-8") + "=" + URLEncoder.encode(X, "UTF-8")); /*기준위치 X*/
        urlBuilder.append("&" + URLEncoder.encode("tmY","UTF-8") + "=" + URLEncoder.encode(Y, "UTF-8")); /*기준위치 Y*/
        urlBuilder.append("&" + URLEncoder.encode("radius","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*단위 m(미터)*/
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
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        return busStop;
    }

    // tag값의 정보를 가져오는 메소드
    private static String getTagValue(String tag, Element eElement) {
        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
        Node nValue = (Node) nlList.item(0);
        if(nValue == null)
            return null;
        return nValue.getNodeValue();
    }

    public static BusStop getData(URL url) {
        BusStop busStop = new BusStop();
        try{
            DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
            Document doc = dBuilder.parse(url.openStream());

            // root tag
            doc.getDocumentElement().normalize();
            System.out.println("Root element :" + doc.getDocumentElement().getNodeName());
            // doc.getDocumentElement().getNodeName()는 XML의 최상위 tag값 ; Root element : <ServiceResult>

            // 파싱할 tag
            NodeList nList = doc.getElementsByTagName("itemList");
            System.out.println("파싱할 리스트 수 : "+ nList.getLength());


            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {

                    Element eElement = (Element) nNode;

                    String stationId = getTagValue("stationId", eElement);
                    String stationNm = getTagValue("stationNm", eElement);
                    String arsId = getTagValue("arsId", eElement);


                    if (stationId != null) {
                        System.out.println("정류소 번호: " + arsId);
                        System.out.println("정류소 ID: " + stationId);
                        System.out.println("정류소 명: " + stationNm);
                        busStop.setNearStationName(stationNm);
                        busStop.setNearStationUIDs(arsId);
                    } else {
                        System.out.println("정류소 정보가 없습니다.");
                    }

                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return busStop;
    }

    @GetMapping("/getStationByPosD")
    public BusStop nearStD(String X, String Y) throws IOException {
        BusStop busStop = new BusStop();
        // http://localhost:8080/getStationByPos?X=126.9407&Y=37.56223 형태로 사용해야함
        StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/stationinfo/getStationByPos"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=0Fdhoh8PtruSsgs%2FDtWVvlxqcjTWEI7QPfeDB1SwDPbX311RBVfaatvVkZvZRum3gM0QwziF2OJts4FG11Y1uw%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("tmX","UTF-8") + "=" + URLEncoder.encode(X, "UTF-8")); /*기준위치 X*/
        urlBuilder.append("&" + URLEncoder.encode("tmY","UTF-8") + "=" + URLEncoder.encode(Y, "UTF-8")); /*기준위치 Y*/
        urlBuilder.append("&" + URLEncoder.encode("radius","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*단위 m(미터)*/
        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            // XML 데이터 파싱 및 출력
            busStop = getData2(url);
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
        return busStop;
    }
    public static BusStop getData2(URL url) {
        BusStop busStop = new BusStop();
        try {
            DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
            Document doc = dBuilder.parse(url.openStream());

            doc.getDocumentElement().normalize();
            NodeList nList = doc.getElementsByTagName("itemList");

            if (nList.getLength() > 0) { // 최소한 하나 이상의 <itemList>가 존재해야 함
                Node nNode = nList.item(0); // 첫 번째 <itemList> 요소 가져오기

                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;

                    String stationId = getTagValue("stationId", eElement);
                    String stationNm = getTagValue("stationNm", eElement);
                    String arsId = getTagValue("arsId", eElement);

                    if (stationId != null) {
                        System.out.println("정류소 번호: " + arsId);
                        System.out.println("정류소 ID: " + stationId);
                        System.out.println("정류소 명: " + stationNm);
                        busStop.setNearStationName(stationNm);
                        busStop.setNearStationUIDs(arsId);
                    } else {
                        System.out.println("정류소 정보가 없습니다.");
                    }
                }
            } else {
                System.out.println("파싱할 데이터가 없습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return busStop;
    }

}