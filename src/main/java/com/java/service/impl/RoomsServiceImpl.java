package com.java.service.impl;

import com.java.entity.Rooms;
import com.java.service.RoomsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Auther: Administrator
 * @Date: 2020-02-21 09:39
 * @Description:
 */
@Service
@Transactional(readOnly = false)
public class RoomsServiceImpl extends BaseServiceImpl<Rooms>  implements RoomsService{
}
