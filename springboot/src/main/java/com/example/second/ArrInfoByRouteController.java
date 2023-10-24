package com.example.second;

import org.springframework.web.bind.annotation.GetMapping;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

public class ArrInfoByRouteController {
    @GetMapping("/getArrInfoByRoute")
    public static void ABList2(String stId, String busRouteId, String ord, Bus bus) throws IOException {
        // http://localhost:8080/getArrInfoByRouteAll?busRouteId=100100118 형식으로 사용

        StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRoute"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=0Fdhoh8PtruSsgs%2FDtWVvlxqcjTWEI7QPfeDB1SwDPbX311RBVfaatvVkZvZRum3gM0QwziF2OJts4FG11Y1uw%3D%3D"); /*Service Key*/
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
            getData(url, bus);
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
    }

    // tag값의 정보를 가져오는 메소드
    private static String getTagValue(String tag, Element eElement) {
        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
        Node nValue = (Node) nlList.item(0);
        if(nValue == null)
            return null;
        return nValue.getNodeValue();
    }

    public static void getData(URL url, Bus bus) {
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

            for(int temp = 0; temp < nList.getLength(); temp++){
                Node nNode = nList.item(temp);
                if(nNode.getNodeType() == Node.ELEMENT_NODE){

                    Element eElement = (Element) nNode;
                    System.out.println("######################");

                    String plainNo1 = getTagValue("plainNo1", eElement);
                    String plainNo2 = getTagValue("plainNo2", eElement);
                    String busRouteId = getTagValue("busRouteId", eElement);
                    String arsId = getTagValue("arsId", eElement);

                    System.out.println("첫번째 도착 예정 차량 번호  : " + plainNo1);
                    System.out.println("두번째 도착 예정 차량 번호  : " + plainNo2);
                    System.out.println("노선 ID  : " + busRouteId);
                    System.out.println("정류소 번호  : " + arsId);
                    bus.setArriveBusFirstNum(plainNo1);
                    bus.setArriveBusSecondNum(plainNo2);
                    bus.setBusRoutedId(busRouteId); // 노선 ID 넘겨줘서 해당 버스가 가는 노선 전부 띄워주기
                    bus.setCurrentBusStop(arsId);  // 현재 정류장 번호
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
