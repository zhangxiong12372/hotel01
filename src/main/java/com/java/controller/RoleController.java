package com.java.controller;


import com.java.entity.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *   角色控制器
 */
@Controller
@RequestMapping("/roles")
public class RoleController extends BaseController<Roles> {
}
