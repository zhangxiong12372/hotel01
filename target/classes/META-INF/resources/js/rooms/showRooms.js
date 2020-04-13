layui.use(['jquery','layer','form','upload'], function() {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        form = layui.form,    //实例化表单对象
        upload = layui.upload;  //实例化文件上传对象

    //初始化客房
    loadAllRooms();
    //初始化客房类型
    loadAllRoomType();
    //验证房间号唯一的标记
    var roomNumFlag = false;


    //添加客房
    $("#saveRoomsUI").click(function(){
        //清空输入框
        $("#roomNum").val("");
       //修改弹出层
        layer.open({
            type:1,
            title:"客房添加页面",
            area:['400px','450px'],
            anim: 4,
            shade:0.5,
            content:$("#saveRoomsDiv")
        });
    });
    //房间添加或者修改的提交监听
    form.on('submit(demo3)', function(data){
        var saveJsonRooms = data.field;
        saveJsonRooms['flag'] = '1';
        saveJsonRooms['roomStatus'] = '0';
        saveRooms(saveJsonRooms);
        layer.closeAll();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });


    //加载所有的房间
    function loadAllRooms() {
        $.ajax({
            type: 'POST',
            url: 'rooms/loadAll',
            success: function (data) {
                var roomStatus0 = "";   //空闲
                var roomStatus1 = "";   //已入住
                var roomStatus2 = "";   //打扫
                $.each(data,function (i,item) {
                    if(item.roomStatus=='0'){
                        console.log(item)
                        roomStatus0 += '<li style="background-color: #009688;">';
                        roomStatus0 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus0 += '<div class="code">';
                        roomStatus0 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus0 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus0 += '</div>';
                        roomStatus0 += '</li>';
                    }else if(item.roomStatus=='1'){
                        roomStatus1 += '<li style="background-color: red;">';
                        roomStatus1 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus1 += '<div class="code">';
                        roomStatus1 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus1 += '</div>';
                        roomStatus1 += '</li>';
                    }else {
                        roomStatus2 += '<li style="background-color: blueviolet;">';
                        roomStatus2 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus2 += '<div class="code">';
                        roomStatus2 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus2 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus2 += '<button type="button" value="upd" roomid="'+item.id+'" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                        roomStatus2 += '</div>';
                        roomStatus2 += '</li>';
                    }
                });
                $("ul").eq(0).html(roomStatus0);
                $("ul").eq(1).html(roomStatus1);
                $("ul").eq(2).html(roomStatus2);
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //加载客房类型
    function loadAllRoomType() {
        $.ajax({
            type: 'POST',
            url: 'roomType/loadAll',
            success: function (data) {
                console.log(data);
                var roomTypeStr ='<option value="" selected>-请选择客房类型-</option>';
                $.each(data,function (i,item) {
                    roomTypeStr += '<option value="'+item.id+'">'+item.roomTypeName+'--'+item.roomPrice+'</option>';
                });
                $("#selRoomType").html(roomTypeStr);
                form.render("select");
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }
    
    //添加房价
    function saveRooms(saveJsonRooms) {
        $.ajax({
            type: 'POST',
            url: 'rooms/save',
            data:saveJsonRooms,
            success: function (data) {
                if(data=="success"){
                    layer.msg('客房添加成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRooms();
                }else {
                    layer.msg('客房添加失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }
    //自定义验证
    form.verify({
        roomNum: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length != 4 ) {
                return '房间号为4位';
            }else {
                checkRoomNum(value);
                if(!roomNumFlag){
                    return '此房间号已被占用';
                }
            }
        }
    });
    //房间号唯一验证
    function checkRoomNum(roomNum) {
        $.ajax({
            type: 'POST',
            url: 'rooms/getCountByParams',
            async:false,
            data:{'roomNum':roomNum},
            success: function (data) {
                console.log(data);
                if(data>0){
                    roomNumFlag = false;
                    layer.tips('房间号已使用！！', $("#roomNum"), {tips: [2,'#fc1505'],time:2000,});
                }else {
                    roomNumFlag = true;
                    layer.tips('房间号可用。。', $("#roomNum"), {tips: [2,'green'],time:2000,});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        ,url: 'rooms/uploadRoomPic' //改成您自己的上传接口
        ,field:'myFile'  //设置文件域字段名
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){
            //如果上传失败
            if(res.code == 0){
                layer.msg('上传成功');
                $("#roomPicId").val(res.newFileName);
            }else {
                layer.msg('上传失败');
            }
            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });

    //房间删除和修该状态
    $("ul").on("click","button",function () {
        var event = $(this).val();
        var roomid = $(this).attr("roomid");
        if (event==="del"){
            layer.confirm("您确定删除此房间吗?",function(index){
                updRoomsFlag(roomid);
                layer.close(index);
            });
        }else{
            layer.confirm("您确定修改此房间状态吗?",function(index){
                updRoomsStatus(roomid);
                layer.close(index);
            });
        }
    });

    //修改房间flag
    function updRoomsFlag(roomid) {
        console.log(roomid);
        $.ajax({
            type: 'POST',
            url: 'rooms/updByPrimaryKeySelective',
            data:{
                'id':roomid,
                "flag":0
            },
            success: function (data) {
                if(data=="success"){
                    layer.msg('客房删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRooms();
                }else {
                    layer.msg('客房删除失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //修改房间roomStatus
    function updRoomsStatus(roomid) {
        $.ajax({
            type: 'POST',
            url: 'rooms/updByPrimaryKeySelective',
            data:{
                'id':roomid,
                "roomStatus":"0"
            },
            success: function (data) {
                if(data=="success"){
                    layer.msg('客房状态修改成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRooms();
                }else {
                    layer.msg('客房状态修改失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }
});