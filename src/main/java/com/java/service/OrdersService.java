package com.java.service;


import com.java.entity.Orders;

/**
 *   订单业务层接口
 */
public interface OrdersService extends BaseService<Orders>{

    //支付后修改订单状态,生成消费记录
    String afterOrdersPay(String out_trade_no) throws Exception;

}
