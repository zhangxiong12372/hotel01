package com.java.service.impl;

import com.java.entity.RoomType;
import com.java.service.BaseService;
import com.java.service.RoomSaleService;
import com.java.service.RoomTypeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Auther: Administrator
 * @Date: 2020-02-27 14:20
 * @Description:
 */
@Service
@Transactional(readOnly = false)
public class RoomTypeServiceImpl extends BaseServiceImpl<RoomType> implements RoomTypeService {
}
