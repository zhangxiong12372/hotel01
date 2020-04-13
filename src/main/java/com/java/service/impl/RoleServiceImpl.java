package com.java.service.impl;


import com.java.entity.Authority;
import com.java.entity.Roles;
import com.java.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 *   角色业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoleServiceImpl extends BaseServiceImpl<Roles> implements RoleService {

    //重写角色根据条件分页查询的方法
    @Override
    public Map<String, Object> findPageByParams(Integer page, Integer limit, Roles roles) throws Exception {
        //1.执行父类的分页查询方法，得到分页数据
        Map<String, Object> map = super.findPageByParams(page, limit, roles);
        //2.取出map中的角色分页数据List<Roles>
        List<Roles> list = (List<Roles>) map.get("data");
        //3.通过循环将每一个角色拥有的一级权限数据查询出来
        for (int i=0;i<list.size();i++){
            //3.1.获取每一次循环的角色对象
            Roles role = list.get(i);
            //3.2.根据角色id查询其角色拥有的一级权限数据
            List<Authority> firstAuthorities = authorityMapper.selectAuthoritiesByRoleIdAndParent(role.getId(),0);
            //3.3.将一级权限循环得到权限名称字符串
            StringBuffer firstANames = new StringBuffer();
            for (int j=0;j<firstAuthorities.size();j++){
                //得到角色的一级权限名称
                firstANames.append(firstAuthorities.get(j).getAuthorityName()+",");
            }
            //4.将字符串设置到角色对象中
            role.setFirstANames(firstANames.toString().substring(0,firstANames.length()-1));
        }
        return map;
    }
}
