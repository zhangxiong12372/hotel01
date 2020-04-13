package com.java.controller;


import com.java.entity.Orders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *   订单控制器
 */
@Controller
@RequestMapping("/orders")
public class OrdersController extends BaseController<Orders>{
    //订单支付页面
    @RequestMapping("/toPay")
    public String toPay(){
        return "alipay/ordersPay";
    }


    @RequestMapping("/myOrdersPay")
    public String myOrdersPay(String out_trade_no){
        System.out.println("out_trade_no="+out_trade_no);
        try {
            return ordersService.afterOrdersPay(out_trade_no);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }


}
