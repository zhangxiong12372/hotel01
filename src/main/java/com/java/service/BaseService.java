package com.java.service;

import java.util.List;
import java.util.Map;

/**
 *   基础业务层接口
 * @param <T>  传入的实体对象泛型
 */
public interface BaseService<T> {

    /**
     *   根据主键删除单个数据
     * @param id  主键id
     */
    String removeByPrimaryKey(Integer id) throws Exception;

    /**
     *   添加数据
     * @param t  添加数据对象
     */
    String save(T t) throws Exception;

    /**
     *   动态添加数据
     * @param t  添加数据对象
     */
    String saveSelective(T t) throws Exception;

    /**
     *   根据主键查询单个数据
     * @param id  主键id
     */
    T findByPrimaryKey(Integer id) throws Exception;

    /**
     *   根据主键动态修改数据
     * @param t  要修改的对象数据
     */
    String updateByPrimaryKeySelective(T t) throws Exception;

    /**
     *   根据主键修改所有字段数据
     * @param t  要修改的对象数据
     */
    String updateByPrimaryKey(T t) throws Exception;

    /**
     *   根据条件分页加载数据
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param t  查询的条件
     */
    Map<String,Object> findPageByParams(Integer page, Integer limit, T t) throws Exception;

    /**
     *   根据条件查询单个数据
     * @param t  条件对象
     */
    T findByParams(T t) throws Exception;

    /**
     *   根据条件查询多个数据
     * @param t 条件参数
     */
    List<T> findManyByParams(T t) throws Exception;

    /**
     *   根据多个主键ids动态批量修改数据
     * @param ids  多个主键ids数组
     */
    String updBatchByPrimaryKeySelective(Integer[] ids, T t) throws Exception;

    /**
     * 根据条件查询数据条数
     * @param t
     * @return
     */
    Integer getCountByParams(T t) throws Exception;

    /**
     * 查询所有的数据
     * @return
     * @throws Exception
     */
    List<T> findAll() throws Exception;
}
