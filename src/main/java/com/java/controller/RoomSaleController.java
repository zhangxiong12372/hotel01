package com.java.controller;


import com.java.entity.RoomSale;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 *   消费记录控制器
 */
@Controller
@RequestMapping("/roomSale")
public class RoomSaleController extends BaseController<RoomSale> {
    //根据房间编号分组统计房间的出租总金额
    @RequestMapping("/loadSalePriceByRoomNum")
    public @ResponseBody
    Map<String,Object> loadSalePriceByRoomNum(){
        try {
            return roomSaleService.findSalePriceByRoomNum();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
