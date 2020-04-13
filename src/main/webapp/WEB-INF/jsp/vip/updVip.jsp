<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>修改会员界面</title>
</head>
<body>
    <div align="center" style="display: none;margin-top: 20px;" id="updVipDiv">
        <form class="layui-form layui-form-pane" action="" lay-filter="exitInRoomInfoForm" style="margin-left: 50px;">
            <input type="hidden" name="id" id="vip_id"/>
            <div class="layui-form-item">
                <label class="layui-form-label">手机号：</label>
                <div class="layui-input-inline">
                    <input type="text" name="phone" id="phone" lay-verify="required|phone" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">会员类型：</label>
                <div class="layui-input-inline">
                    <select name="vipRate" id="vipRate" lay-verify="required"></select>
                </div>
            </div>
            <div class="layui-form-item" style="text-align: center">
                <button class="layui-btn layui-btn-sm" lay-submit="" lay-filter="demo3"><i class="layui-icon">&#xe605;</i>修改</button>
                <button type="reset" class="layui-btn layui-btn-primary ">重置</button>
            </div>
        </form>
    </div>
</body>
</html>