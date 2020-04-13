package com.java.controller;


import com.java.entity.Authority;
import com.java.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 *   权限控制器
 */
@Controller
@RequestMapping("/authority")
public class AuthorityController extends BaseController<Authority> {

    //登陆完成后加载用户拥有的权限跳转到平台首页
    @RequestMapping("/toIndex")
    public String toIndex(Model model, HttpSession session){
        //1.在登陆后从session容器中取到登陆的用户数据
        User loginUser = (User) session.getAttribute("loginUser");
       /* User loginUser = new User();
        loginUser.setRoleId(1);*/
        try {
            //2.根据登陆用户角色id查询用户拥有的权限
            List<Map<String,Object>> mapList = authorityService.findAuthoritiesByLogin(loginUser);
            //3.将查询出的权限装入到容器中
            model.addAttribute("mapList",mapList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }

    /**
     *   根据角色id查询角色拥有的权限
     * @param roleId  角色id
     * @return   权限的集合
     * @throws Exception
     */
    @RequestMapping("/loadAuthoritiesByRoleId")
    public @ResponseBody List<Authority> loadAuthoritiesByRoleId(Integer roleId){
        try {
            return authorityService.findAuthoritiesByRoleId(roleId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
