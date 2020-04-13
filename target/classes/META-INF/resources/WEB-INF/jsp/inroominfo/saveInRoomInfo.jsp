<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>入住信息添加页面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
<blockquote class="layui-elem-quote">入住信息的添加</blockquote>
<form class="layui-form" action="" lay-filter="example">
    <div class="layui-form-item">
        <label class="layui-form-label">是否会员</label>
        <div class="layui-input-block">
            <input type="radio" name="isVip" value="1" title="会员" lay-filter="isVip" id="isVip1"/>
            <input type="radio" name="isVip" value="0" title="非会员" checked="checked" lay-filter="isVip" id="isVip0"/>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">会员卡号</label>
            <div class="layui-input-inline">
                <input type="text" id="vip_num"  placeholder="请输入会员卡号" autocomplete="off" class="layui-input" disabled>
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">客人姓名</label>
            <div class="layui-input-inline">
                <input type="text" id="customerName" name="customerName" lay-verify="required" placeholder="请输入客人姓名" autocomplete="off" class="layui-input">
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">选择性别</label>
            <div class="layui-input-block" id="genderDiv">
                <input type="radio" name="gender" value="1" title="男" checked="checked" id="gender1"/>
                <input type="radio" name="gender" value="0" title="女" id="gender0"/>
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">身份证号</label>
            <div class="layui-input-inline">
                <input type="text" id="idcard" name="idcard" lay-verify="required|identity" placeholder="请输入身份证号" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">手机号</label>
            <div class="layui-input-inline">
                <input type="text" id="phone" name="phone" lay-verify="required|phone" placeholder="输入手机号" autocomplete="off" class="layui-input">
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">选择房间</label>
        <div class="layui-input-inline">
            <select name="roomId" id="selRoomNumId" lay-verify="required"></select>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">入住时间</label>
            <div class="layui-input-inline">
                <input type="text" name="createDate" id="create_date" lay-verify="required" placeholder="yyyy/MM/dd HH:mm:ss" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">押金</label>
            <div class="layui-input-inline">
                <input type="text" name="money" lay-verify="required|number|money" placeholder="输入押金" autocomplete="off" class="layui-input">
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit="" lay-filter="demo1">添加</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
    </div>
</form>
</body>
<script src="js/inroominfo/saveInRoomInfo.js"></script>
</html>