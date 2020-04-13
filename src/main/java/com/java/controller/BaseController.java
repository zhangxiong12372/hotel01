package com.java.controller;

import com.java.service.AuthorityService;
import com.java.service.BaseService;
import com.java.service.OrdersService;
import com.java.service.RoomSaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BaseController<T> {
    //依赖基础的业务层对象
    @Autowired
    protected BaseService<T> baseService;

    //订单的业务层对象
    @Autowired
    protected OrdersService ordersService;

    //权限的业务层对象
    @Autowired
    protected AuthorityService authorityService;

    //房间销售记录业务层对象
    @Autowired
    protected RoomSaleService roomSaleService;

    /**
     *   根据主键删除单个数据
     * @param id  主键id
     */
    @RequestMapping("/delByPrimaryKey")
    public @ResponseBody String delByPrimaryKey(Integer id){
        try {
            return baseService.removeByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   添加数据
     * @param t  添加数据对象
     */
    @RequestMapping("/save")
    public @ResponseBody String save(T t){
        try {
            return baseService.save(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   动态添加数据
     * @param t  添加数据对象
     */
    @RequestMapping("/saveSelective")
    public @ResponseBody String saveSelective(T t) {
        try {
            return baseService.saveSelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   根据主键查询单个数据
     * @param id  主键id
     */
    @RequestMapping("/loadByPrimaryKey")
    public @ResponseBody T loadByPrimaryKey(Integer id) {
        try {
            return baseService.findByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *   根据主键动态修改数据
     * @param t  要修改的对象数据
     */
    @RequestMapping("/updByPrimaryKeySelective")
    public @ResponseBody String updByPrimaryKeySelective(T t) {
        try {
            return baseService.updateByPrimaryKeySelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   根据主键修改所有字段数据
     * @param t  要修改的对象数据
     */
    @RequestMapping("/updateByPrimaryKey")
    public @ResponseBody String updateByPrimaryKey(T t){
        try {
            return baseService.updateByPrimaryKey(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   根据条件分页加载数据
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param t  查询的条件
     */
    @RequestMapping("/loadPageByParams")
    public @ResponseBody Map<String,Object> loadPageByParams(Integer page,Integer limit,T t){
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            map = baseService.findPageByParams(page,limit,t);
            map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",200);
            map.put("msg","数据加载异常。。");
        }
        return map;
    }

    /**
     *   根据条件加载单个数据
     * @param t  条件参数对象
     * @return  查询的单个数据
     */
    @RequestMapping("/loadByParams")
    public @ResponseBody T loadByParams(T t){
        try {
            return baseService.findByParams(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *   根据条件加载多个数据
     * @param t  条件参数
     * @return  多条数据
     */
    @RequestMapping("/loadManyByParams")
    public @ResponseBody List<T> loadManyByParams(T t){
        try {
            return baseService.findManyByParams(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *   根据多个主键ids动态批量修改数据
     * @param ids  多个主键ids数组
     * @param t  修改的数据
     */
    @RequestMapping("/updBatchByPrimaryKeySelective")
    public @ResponseBody String updBatchByPrimaryKeySelective(Integer[] ids,T t){
        try {
            return baseService.updBatchByPrimaryKeySelective(ids,t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     * 根据条件查询数据条数
     * @param t
     * @return
     */
    @RequestMapping("/getCountByParams")
    public @ResponseBody Integer getCountByParams(T t){
        try {
            return baseService.getCountByParams(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/loadAll")
    public @ResponseBody List<T> loadAll(){
        try {
            return baseService.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
