package com.java.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *   页面跳转的控制器
 */
@Controller
@RequestMapping("/model")
public class ModelController {

    //跳转到首页
    @RequestMapping("/toIndex")
    public String toIndex(){
        return "index";
    }

    //跳转到入住信息显示页面
    @RequestMapping("/toShowInRoomInfo")
    public String toShowInRoomInfo(){
        return "inroominfo/showInRoomInfo";
    }

    //跳转到入住信息添加页面
    @RequestMapping("/toSaveInRoomInfo")
    public String toSaveInRoomInfo(){
        return "inroominfo/saveInRoomInfo";
    }

    //跳转到订单显示页面
    @RequestMapping("/toShowOrders")
    public String toShowOrders(){
        return "orders/showOrders";
    }

    //跳转到消费显示页面
    @RequestMapping("/toShowRoomSale")
    public String toShowRoomSale(){
        return "roomSale/showRoomSale";
    }

    //跳转到会员显示页面
    @RequestMapping("/toShowVip")
    public String toShowVip(){
        return "vip/showVip";
    }
    //跳转到会员显示页面
    @RequestMapping("/toSaveVip")
    public String toVip(){
        return "vip/saveVip";
    }

    //跳转到客房显示页面
    @RequestMapping("/toShowRooms")
    public String toShowRooms(){
        return "rooms/showRooms";
    }

    //登录
    @RequestMapping("/loginUI")
    public String loginUI(){
        return "login/login";
    }


    //去到角色信息管理页面
    @RequestMapping("/toShowRole")
    public String toShowRole(){
        return "role/showRole";
    }

    //去到用户显示页面
    @RequestMapping("/toShowUser")
    public String toShowUser(){
        return "user/showUser";
    }

    //去到添加用户显示页面
    @RequestMapping("/toSaveUser")
    public String toSaveUser(){
        return "user/saveUser";
    }

    //去到数据分析页面
    @RequestMapping("/toShowIdd")
    public String toShowIdd(){
        return "idd/showIdd";
    }

    //去到房型显示页面
    @RequestMapping("/toShowRoomType")
    public String toShowRoomType(){
        return "roomType/showRoomType";
    }
}
