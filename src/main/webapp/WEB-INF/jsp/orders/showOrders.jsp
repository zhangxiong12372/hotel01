<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <!--引用基础路径-->
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>标题</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
    </style>
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
<div  align="center">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>订单信息显示</legend>
    </fieldset>
    <div >
        <!--查询的表单-->
        <form class="layui-form" action="" lay-filter="example" style="margin-top: 20px;">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">订单编号</label>
                    <div class="layui-input-inline">
                        <input type="text" name="orderNum" autocomplete="off" class="layui-input" placeholder="请输入订单编号">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">时间范围</label>
                    <div class="layui-input-inline" style="width: 420px;">
                        <input type="text" class="layui-input" id="test3" placeholder="选则时间范围" name="queryTimes">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">订单状态</label>
                    <div class="layui-input-block">
                        <select name="orderStatus">
                            <option value="" selected>--全部--</option>
                            <option value="1">已支付</option>
                            <option value="0">未支付</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button class="layui-btn" lay-submit="" lay-filter="demo1"><i class="layui-icon">&#xe615;</i>查询</button>
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button type="button" class="layui-btn layui-btn-danger" id="batchBtn"><i class="layui-icon">&#xe640;</i>批量删除</button>
                    </div>
                </div>
            </div>
        </form>
        <!--订单信息数据显示的容器-->
        <table id="demo" lay-filter="test"></table>
    </div>
</div>
</body>
<!--引入layui的js文件-->
<script src="js/orders/showOrders.js"></script>
<!--表格操作模板-->
<script type="text/html" id="barDemo">
    {{#  if(d.orderStatus == 1){ }}
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    {{#  } else { }}
    <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="payUI"><i class="layui-icon">&#xe65e;</i>支付</a>
    {{#  } }}
</script>
<script type="text/html" id="isVipTpl">
    {{#  if(d.inRoomInfo.isVip == 1){ }}
    <font color="green">是</font>
    {{#  } else { }}
    <font color="red">否</font>
    {{#  } }}
</script>
<script type="text/html" id="orderStatusTpl">
    {{#  if(d.orderStatus == 1){ }}
    <font color="green">已结算</font>
    {{#  } else { }}
    <font color="red">未结算</font>
    {{#  } }}
</script>
</html>