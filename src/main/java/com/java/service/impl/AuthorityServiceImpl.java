package com.java.service.impl;


import com.java.entity.Authority;
import com.java.entity.User;
import com.java.service.AuthorityService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   权限业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class AuthorityServiceImpl extends BaseServiceImpl<Authority> implements AuthorityService {

    /**
     *   根据角色id查询角色拥有的权限
     * @param roleId  角色id
     * @return   权限的集合
     * @throws Exception
     */
    @Override
    public List<Authority> findAuthoritiesByRoleId(Integer roleId) throws Exception {
        return authorityMapper.selectAuthoritiesByRoleId(roleId);
    }


    /**
     *   根据用户登陆之后查询其拥有的权限菜单
     * @param user
     * @return
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> findAuthoritiesByLogin(User user) throws Exception {
        //1.新建装入一级权限和二级权限数据的list集合
        List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        //2.根据登陆用户的角色id查询其拥有的一级权限
        List<Authority> firstAuthorities = authorityMapper.selectAuthoritiesByRoleIdAndParent(user.getRoleId(), 0);
        //3.根据登陆用户拥有的一级权限分别查询出其拥有的二级权限（通过循环）
        for (int i=0;i<firstAuthorities.size();i++){
            //3-1.得到一级权限对象
            Authority firstAuthority  = firstAuthorities.get(i);
            //3-2.新建装一级权限的map集合
            Map<String,Object> map = new HashMap<String, Object>();
            //3-3.装一级权限的id
            map.put("firstAId",firstAuthority.getId());
            //3-4.装一级权限的名字
            map.put("firstAName",firstAuthority.getAuthorityName());
            //3-5.根据一级权限查询出每一个一级权限的二级权限
            List<Authority> secAuthorities = authorityMapper.selectAuthoritiesByRoleIdAndParent(user.getRoleId(), firstAuthority.getId());
            //3-6.装此一级权限拥有的二级权限
            map.put("secAuthorities",secAuthorities);
            //4.将装好权限的一级权限map集合装入到mapList并返回
            mapList.add(map);
        }
        return mapList;
    }



}
