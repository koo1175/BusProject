package com.example.Bus;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class XmlParsing_test {

    // tag값의 정보를 가져오는 메소드
    private static String getTagValue(String tag, Element eElement) {
        NodeList nlList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
        Node nValue = (Node) nlList.item(0);
        if(nValue == null)
            return null;
        return nValue.getNodeValue();
    }

    public static void getData() {
//        int page = 1;	// 페이지 초기값
        try{
            while(true){
                // parsing할 url 지정(API 키 포함해서)
                String url = "http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?ServiceKey=t2qs2a1o15tXR1NhKWY%2FTplsMnvey2e3kTFt8BIlR8dJ6JsaALNvYI6%2B5dKPSJbl%2FJ9C0dF7%2Boi2NwGJKHikSQ%3D%3D&busRouteId=100100118";

                DocumentBuilderFactory dbFactoty = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactoty.newDocumentBuilder();
                Document doc = dBuilder.parse(url);

                // root tag
                doc.getDocumentElement().normalize();
                System.out.println("Root element :" + doc.getDocumentElement().getNodeName());
                // doc.getDocumentElement().getNodeName()는 XML의 최상위 tag값 ; Root element : <ServiceResult>

                // 파싱할 tag
                NodeList nList = doc.getElementsByTagName("itemList");
//                System.out.println("파싱할 리스트 수 : "+ nList.getLength());

                for(int temp = 0; temp < nList.getLength(); temp++){
                    Node nNode = nList.item(temp);
                    if(nNode.getNodeType() == Node.ELEMENT_NODE){

                        Element eElement = (Element) nNode;
                        System.out.println("######################");
                        //System.out.println(eElement.getTextContent());
                        System.out.println("도착예정차량번호  : " + getTagValue("stNm", eElement));
//                        System.out.println("상품 코드  : " + getTagValue("fin_prdt_cd", eElement));
//                        System.out.println("상품명 : " + getTagValue("fin_prdt_nm", eElement));
//                        System.out.println("연평균 수익률  : " + getTagValue("avg_prft_rate", eElement));
//                        System.out.println("공시 이율  : " + getTagValue("dcls_rate", eElement));
                    }
                }

//                page += 1;
//                System.out.println("page number : "+page);
//                if(page > 12){
//                    break;
//                }
            }

        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
