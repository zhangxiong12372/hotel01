package com.java.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *  基础Mapper代理对象
 */
public interface BaseMapper<T> {

    /**
     *   根据主键删除单个数据
     * @param id  主键id
     */
    Integer deleteByPrimaryKey(Integer id) throws Exception;

    /**
     *   添加数据
     * @param t  添加数据对象
     */
    Integer insert(T t) throws Exception;

    /**
     *   动态添加数据
     * @param t  添加数据对象
     */
    Integer insertSelective(T t) throws Exception;

    /**
     *   根据主键查询单个数据
     * @param id  主键id
     * @return  单个数据结果
     */
    T selectByPrimaryKey(Integer id) throws Exception;

    /**
     *   根据主键动态修改数据
     * @param t  要修改的对象数据
     */
    Integer updateByPrimaryKeySelective(T t) throws Exception;

    /**
     *   根据主键修改所有字段数据
     * @param t  要修改的对象数据
     */
    Integer updateByPrimaryKey(T t) throws Exception;

    /**
     *   根据条件分页查询数据
     * @param t  查询的条件
     * @Param("t") 指明传入到Mapper.xml中的对象名称为"t"
     */
    List<T> selectPageByParams(@Param("t") T t) throws Exception;

    /**
     *   根据条件查询单个数据
     * @param t  条件对象
     */
    T selectByParams(@Param("t") T t) throws Exception;

    /**
     *   根据条件查询多个数据
     * @param t 条件参数
     */
    List<T> selectManyByParams(@Param("t") T t) throws Exception;

    /**
     *   根据多个主键ids动态批量修改数据
     * @param ids  多个主键ids数组
     */
     Integer updBatchByPrimaryKeySelective(@Param("ids") Integer[] ids, @Param("t") T t) throws Exception;

    /**
     * 根据条件查询数据条数
     * @param t
     * @return
     */
     Integer getCountByParams( @Param("t") T t) throws Exception;

    /**
     * 查询所有的数据
     * @return
     * @throws Exception
     */
     List<T> selectAll() throws Exception;
}
