package com.example.Bus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class Test {
    @GetMapping("/hello")
    @ResponseBody
    public String hello() throws IOException {
        BusRouteList.getArrInfoByRoute("100100016", "113000003", "18");
        return "Hello World";
    }
}
// "100100016", "113000003", "18"
