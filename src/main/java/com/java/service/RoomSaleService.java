package com.java.service;


import com.java.entity.RoomSale;

import java.util.Map;

/**
 *   消费记录业务层接口
 */
public interface RoomSaleService extends BaseService<RoomSale> {
    //根据房间编号分组统计房间的出租总金额
    Map<String,Object> findSalePriceByRoomNum() throws Exception;
}
