package com.java;


import com.java.entity.InRoomInfo;
import com.java.service.InRoomInfoService;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Map;

/**
 *   入住信息业务层测试类
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class InRoomInfoServiceTest {

    @Autowired
    private InRoomInfoService inRoomInfoService;

    //日志对象
    private static final Logger log = Logger.getLogger(InRoomInfoServiceTest.class);

    //测试分页查询
    @Test
    public void test01(){
        //新建查询条件
        InRoomInfo PraInRoomInfo = new InRoomInfo();
        try {
            Map<String, Object> map = inRoomInfoService.findPageByParams(1, 3, PraInRoomInfo);
            log.info("总共有"+map.get("count")+"条数据");
            List<InRoomInfo> inRoomInfos = (List<InRoomInfo>) map.get("data");
            for (InRoomInfo inRoomInfo:inRoomInfos) {
                log.info(inRoomInfo);
                log.info("----------------------------");
                log.info(inRoomInfo.getRooms());
                log.info("------------------------------");
                log.info(inRoomInfo.getRooms().getRoomType());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
