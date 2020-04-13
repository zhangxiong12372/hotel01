<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<!--房间添加的表单-->
<div style="display: none;margin-top: 20px;text-align: center" id="saveRoomsDiv">
    <!--做文件上传的div-->
    <div class="layui-upload" align="center" style="margin-bottom: 20px;">
        <div class="layui-upload-list">
            <img class="layui-upload-img" id="demo1" src="img/fm1.jpg" width="150px" height="150px"/>
            <p id="demoText"></p>
        </div>
        <button type="button" class="layui-btn" id="test1">上传图片</button>
    </div>

    <form class="layui-form layui-form-pane" action="" style="margin-left: 50px;">
        <input type="hidden" name="roomPic" id="roomPicId" value="fm1.jpg"/>
        <div class="layui-form-item">
            <label class="layui-form-label">房间号：</label>
            <div class="layui-input-inline">
                <input type="text" id="roomNum" name="roomNum" placeholder="请输入房间号" lay-verify="required|number|roomNum" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">房间类型：</label>
            <div class="layui-input-inline">
                <select id="selRoomType" name="roomTypeId"></select>
            </div>
        </div>
        <div class="layui-form-item">
            <button class="layui-btn layui-btn-lg" lay-submit="" lay-filter="demo3"><i class="layui-icon">&#xe605;</i>添加房间</button>
        </div>
    </form>
</div>

</body>
</html>
