package com.java.service.impl;


import com.java.entity.RoomSale;
import com.java.service.RoomSaleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   消费记录业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements RoomSaleService {
    //根据房间编号分组统计房间的出租总金额
    @Override
    public Map<String, Object> findSalePriceByRoomNum() throws Exception {
        //1.新建一个map集合，响应回界面
        Map<String,Object> dataMap = new HashMap<String, Object>();
        //1.1.往此dataMap中装数据分析中说明的数据
        dataMap.put("legend","消费金额");
        //2.调用mapper查询出房间出租的金额数据
        List<Map<String,Object>> mapList = roomSaleMapper.selectSalePriceByRoomNum();
        //3.定义横轴的list集合
        List<String> xAxis = new ArrayList<String>();
        //4.定义图表的map数据集合
        Map<String,Object> series = new HashMap<String, Object>();
        //4.1.往series中装图表的类型和名称
        series.put("name","消费金额");
        series.put("type","line");
        //4.2.定义图表的销售金额数据集合
        List<Double> data = new ArrayList<Double>();
        //5.将查询出来的mapList进行循环
        for (Map<String,Object> map:mapList) {
            //5.1.将房间编号装入到xAxis
            xAxis.add(map.get("room_num").toString());
            //5.2.将销售的金额装到销售金额数据集合中
            data.add((Double) map.get("saleprices"));
        }
        //6.将图表的销售金额数据集合装入到图表series集合中
        series.put("data",data);
        //7.将横轴数据集合和图表数据集合都装入到dataMap中
        dataMap.put("xAxis",xAxis);
        dataMap.put("series",series);
        return dataMap;
    }
}
