package com.java.service.impl;

import com.java.entity.Authority;
import com.java.entity.User;
import com.java.service.UserService;
import com.java.utils.MD5;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @Auther: Administrator
 * @Date: 2020-02-29 10:37
 * @Description:
 */
@Service
@Transactional(readOnly = false)
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

    //重写根据条件分页查询
    @Override
    public Map<String, Object> findPageByParams(Integer page, Integer limit, User user) throws Exception {
        //获取分页查询的map集合数据
        Map<String, Object> map = super.findPageByParams(page, limit, user);
        //得到分页发用户数据
        List<User> list = (List<User>) map.get("data");
        //3.通过循环将每一个角色拥有的一级权限数据查询出来
        for (int i=0;i<list.size();i++){
            //3.1.获取每一次循环的用户对象
            User u = list.get(i);
            //3.2.根据角色id查询其角色拥有的一级权限数据
            List<Authority> firstAuthorities = authorityMapper.selectAuthoritiesByRoleIdAndParent(u.getRoleId(),0);
            //3.3.将一级权限循环得到权限名称字符串
            StringBuffer firstANames = new StringBuffer();
            for (int j=0;j<firstAuthorities.size();j++){
                //得到角色的一级权限名称
                firstANames.append(firstAuthorities.get(j).getAuthorityName()+",");
            }
            //4.将字符串设置到用户对象中
            u.setFirstANames(firstANames.toString().substring(0,firstANames.length()-1));
        }
        return map;
    }
    //保存时密码加密
    @Override
    public String save(User user) throws Exception {
        user.setPwd(MD5.md5crypt(user.getPwd()));
        return super.save(user);
    }
}
