package com.java.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.java.mapper.*;
import com.java.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   基础业务层实现类
 */
public class BaseServiceImpl<T> implements BaseService<T> {

    @Autowired
    protected BaseMapper<T> baseMapper;

    @Autowired
    protected InRoomInfoMapper inRoomInfoMapper;

    @Autowired
    protected RoomsMapper roomsMapper;

    @Autowired
    protected RoomSaleMapper roomSaleMapper;
    //定义权限的Mapper代理对象
    @Autowired
    protected AuthorityMapper authorityMapper;

    /**
     *   根据主键删除单个数据
     * @param id  主键id
     */
    @Override
    public String removeByPrimaryKey(Integer id) throws Exception{
        if(baseMapper.deleteByPrimaryKey(id)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   添加数据
     * @param t  添加数据对象
     */
    @Override
    public String save(T t) throws Exception{
        if(baseMapper.insert(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   动态添加数据
     * @param t  添加数据对象
     */
    @Override
    public String saveSelective(T t) throws Exception{
        if(baseMapper.insertSelective(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   根据主键查询单个数据
     * @param id  主键id
     */
    @Override
    public T findByPrimaryKey(Integer id) throws Exception{
        return baseMapper.selectByPrimaryKey(id);
    }

    /**
     *   根据主键动态修改数据
     * @param t  要修改的对象数据
     */
    @Override
    public String updateByPrimaryKeySelective(T t) throws Exception{
        if(baseMapper.updateByPrimaryKeySelective(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   根据主键修改所有字段数据
     * @param t  要修改的对象数据
     */
    @Override
    public String updateByPrimaryKey(T t) throws Exception{
        if(baseMapper.updateByPrimaryKey(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   根据条件分页加载数据
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param t  查询的条件
     */
    @Override
    public Map<String, Object> findPageByParams(Integer page, Integer limit, T t) throws Exception {
        //1.新建map集合
        Map<String,Object> map = new HashMap<String, Object>();
        //2.进行分页
        PageHelper.startPage(page,limit);
        //3.查询分页数据
        PageInfo<T> pageInfo = new PageInfo<T>(baseMapper.selectPageByParams(t));
        //4.设置总共的数据条数
        map.put("count",pageInfo.getTotal());
        //5.设置分页的集合对象数据
        map.put("data",pageInfo.getList());
        return map;
    }

    /**
     *   根据条件查询单个数据
     * @param t  条件对象
     */
    @Override
    public T findByParams(T t) throws Exception {
        return baseMapper.selectByParams(t);
    }

    /**
     *   根据条件查询多个数据
     * @param t 条件参数
     */
    @Override
    public List<T> findManyByParams(T t) throws Exception {
        return baseMapper.selectManyByParams(t);
    }

    /**
     *   根据多个主键ids动态批量修改数据
     * @param ids  多个主键ids数组
     */
    @Override
    public String updBatchByPrimaryKeySelective(Integer[] ids, T t) throws Exception {
        if(baseMapper.updBatchByPrimaryKeySelective(ids,t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     * 根据条件查询数据条数
     * @param t
     * @return
     */
    @Override
    public Integer getCountByParams(T t) throws Exception {
        return baseMapper.getCountByParams(t);
    }

    @Override
    public List<T> findAll() throws Exception {
        return baseMapper.selectAll();
    }
}
