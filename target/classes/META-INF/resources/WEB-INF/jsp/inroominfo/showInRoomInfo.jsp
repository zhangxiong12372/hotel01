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

    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
        .layui-table td img{
            width:60px;
            height: 60px;
        }
    </style>
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
<div align="center">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>入住信息显示</legend>
    </fieldset>
    <!--入住信息数据显示的容器-->
    <table id="demo" lay-filter="test"></table>
    <!--讲退房操作界面包含进来-->
    <jsp:include page="exitRooms.jsp"/>
    <%--查看入住信息--%>
    <jsp:include page="queryRoom.jsp"/>
</div>
</body>
<!--引入layui的js文件-->
<script src="js/inroominfo/showInRoomInfo.js"></script>
<!--表格操作模板-->
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="query"><i class="layui-icon">&#xe615;</i>查看</a>
    {{#  if(d.outRoomStatus == 1){ }}
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    {{#  } else { }}
    <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="exit"><i class="layui-icon">&#xe642;</i>退房</a>
    {{#  } }}
</script>
<%--会员模板--%>
<script type="text/html" id="isVipTpl">
    {{#  if(d.isVip == 1){ }}
    <font color="green">是</font>
    {{#  } else { }}
    <font color="red">否</font>
    {{#  } }}
</script>
<%--性别模板--%>
<script type="text/html" id="genderTpl">
    {{#  if(d.gender == 1){ }}
    <font color="blue">男</font>
    {{#  } else { }}
    <font color="#db7093">女</font>
    {{#  } }}
</script>
<%--入住状态--%>
<script type="text/html" id="outRoomStatusTpl">
    {{#  if(d.outRoomStatus == 1){ }}
    <font color="green">已退房</font>
    {{#  } else { }}
    <font color="red">未退房</font>
    {{#  } }}
</script>
</html>