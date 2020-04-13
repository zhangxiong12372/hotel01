<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<!--房间类型添加的div-->
<div style="display: none;margin-top: 20px;" id="saveRoomTypeDiv">
    <form class="layui-form layui-form-pane" action="" style="margin-left: 50px;">
        <div class="layui-form-item">
            <label class="layui-form-label">类型名称：</label>
            <div class="layui-input-inline">
                <input type="text" name="roomTypeName" placeholder="请输入房间类型名称" lay-verify="required|roomTypeName" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">类型价格：</label>
            <div class="layui-input-inline">
                <input type="text" name="roomPrice" placeholder="请输入房间类型价格" lay-verify="required|number|roomPrice" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item" style="margin-left: 70px;margin-top: 30px;">
            <button class="layui-btn layui-btn-lg" lay-submit="" lay-filter="demo3"><i class="layui-icon">&#xe609;</i>添加房间类型</button>
        </div>
    </form>
</div>

<!--房间类型修改的div-->
<div style="display: none;margin-top: 20px;" id="updRoomTypeDiv">
    <form class="layui-form layui-form-pane" lay-filter="updRoomTypeFromFilter" action="" style="margin-left: 50px;">
        <input type="hidden" name="id">
        <div class="layui-form-item">
            <label class="layui-form-label">类型名称：</label>
            <div class="layui-input-inline">
                <input type="text" name="roomTypeName" disabled autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">类型价格：</label>
            <div class="layui-input-inline">
                <input type="text" name="roomPrice" placeholder="请输入房间类型价格" lay-verify="required|number|roomPrice" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item" style="margin-left: 70px;margin-top: 30px;">
            <button class="layui-btn layui-btn-lg" lay-submit="" lay-filter="demo4"><i class="layui-icon">&#xe609;</i>修改房间类型</button>
        </div>
    </form>
</div>

</body>
</html>
