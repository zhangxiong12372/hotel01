<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>查看界面</title>
</head>
<body>

<div style="display: none;margin-top: 20px;" id="queryInRoomInfoDiv">
    <form class="layui-form layui-form-pane" action="" lay-filter="queryInRoomInfoForm" style="margin-left: 20px;">
        <!--入住信息id,被隐藏-->
        <input type="hidden" name="inRoomInfo_id"/>
        <!--会员的折扣-->
        <input type="hidden" name="vipRate" id="vipRate1"/>
        <div class="layui-form-item">
            <label class="layui-form-label">房间号：</label>
            <div class="layui-input-inline">
                <input type="text" name="roomNum" id="roomsNum1" lay-verify="required" autocomplete="off" class="layui-input" disabled>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">客人姓名：</label>
                <div class="layui-input-block">
                    <input type="text" name="customerName" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">身份证号：</label>
                <div class="layui-input-inline">
                    <input type="text" name="idcard" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">是否会员：</label>
                <div class="layui-input-block">
                    <input type="text" name="isVip" id="isVip1" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">会员卡号：</label>
                <div class="layui-input-inline">
                    <input type="text" name="vipNum" id="vipNum1" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">房间单价：</label>
                <div class="layui-input-block">
                    <input type="text" name="roomPrice" id="onePrice1" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">其它消费：</label>
                <div class="layui-input-inline">
                    <!--lay-verify="number|otherPrice"中的otherPrice自定义验证名称-->
                    <input type="text" name="otherPrice" lay-verify="number|otherPrice" value="0" autocomplete="off" class="layui-input" placeholder="请输入金额" id="otherPrice1">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">入住时间：</label>
                <div class="layui-input-block">
                    <input type="text" name="createDate" id="createDate1" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">当前时间：</label>
                <div class="layui-input-inline">
                    <input type="text" name="endDate" id="endDate1" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <span style="margin-left: 20px;">住房天数：</span>
            <span style="font-size: 30px;color: green" id="days1"></span>天
            <span style="margin-left: 160px;">当前消费总额：￥</span>
            <span style="font-size: 30px;color: red" id="zprice1"></span>元
        </div>
    </form>
</div>

</body>
</html>
