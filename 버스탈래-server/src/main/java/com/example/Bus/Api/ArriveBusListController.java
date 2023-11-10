package com.example.Bus.Api;

import com.example.Bus.Model.Dto.Bus;
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
import java.util.List;

//@CrossOrigin(origins = "http://bus-project.kro.kr/") // 리액트 네이티브와 스프링 부트의 포트를 통일하기 위함
@RestController
public class ArriveBusListController {

    @GetMapping("/getStationByUid")
    public Bus ABList(String arsId) throws IOException {
        Bus bus = new Bus(); // 각 요청마다 새로운 Bus 객체 생성
        // http://localhost:8080/getStationByUid?arsId=13118 형식으로 사용
        StringBuilder urlBuilder = new StringBuilder("http://ws.bus.go.kr/api/rest/stationinfo/getStationByUid"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=7qe7vg3zUQdiZErzcHVVolstffAp3wUBke37nX4dyFcWCPsjYsiHmb5Su25Dw%2Fs1uv5zk6sh3oQq4sIynl8z0A%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("arsId","UTF-8") + "=" + URLEncoder.encode(arsId, "UTF-8")); /*정류소 번호*/
        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            // XML 데이터 파싱 및 출력
            bus = getData(url); // bus 객체 갱신

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
        return bus;
    }



        // tag값의 정보를 가져오는 메소드
    private static String getTagValue(String tag, Element eElement) {
        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
        Node nValue = (Node) nlList.item(0);
        if(nValue == null)
            return null;
        return nValue.getNodeValue();
    }


    public static Bus getData(URL url) {
        Bus bus = new Bus();
        Bus data;
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

                    String arrmsg1 = getTagValue("arrmsg1", eElement);
                    String arrmsg2 = getTagValue("arrmsg2", eElement);
                    String busRouteAbrv = getTagValue("busRouteAbrv", eElement);
                    String adirection = getTagValue("adirection", eElement);
                    String stId = getTagValue("stId", eElement); // 정류소 고유 ID
                    String busRouteId = getTagValue("busRouteId", eElement); // 노선 ID
                    String staOrd = getTagValue("staOrd", eElement); // 순번

                    // ABLIST2를 요청하자. 첫번째 도착 버스의 번호판, 두번째 도착 버스의 번호판을 가져오자.
                    data = ArrInfoByRouteController.ABList2(stId, busRouteId,staOrd);

                    String arriveBusFirstNum = data.getArriveBusFirstNum().get(0);
                    String arriveBusSecondNum = data.getArriveBusSecondNum().get(0);
                    String currentBusStop = data.getCurrentBusStop().get(0);

                    System.out.println("정류소 고유 ID  : " + stId);
                    System.out.println("노선 ID  : " + busRouteId);
                    System.out.println("순번  : " + staOrd);
                    System.out.println("첫번째 도착 예정 버스  : " + arrmsg1);
                    System.out.println("두번째 도착 예정 버스  : " + arrmsg2);
                    System.out.println("버스 번호  : " + busRouteAbrv);
                    System.out.println("방향  : " + adirection);
                    System.out.println("정류소 번호 : " + currentBusStop);
                    System.out.println("첫번째 도착 예정 차량 번호  : " + arriveBusFirstNum);
                    System.out.println("두번째 도착 예정 차량 번호  : " + arriveBusSecondNum);

                    bus.setArsId(currentBusStop);
                    bus.setBusRoutedId(busRouteId);
                    bus.setArriveBusFirstTime(arrmsg1);
                    bus.setArriveBusSecondTime(arrmsg2);
                    bus.setArriveBusNum(busRouteAbrv);
                    bus.setArriveBusDir(adirection);
                    bus.setArriveBusFirstNum(arriveBusFirstNum);
                    bus.setArriveBusSecondNum(arriveBusSecondNum);
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return bus;
    }
}