layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //日期时间选择器
    laydate.render({
        elem: '#createDate1'
        ,type: 'datetime'
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,value:new Date()
    });

    var userNameFlag = false;
    //加载角色信息
   loadAllRoles();


    //监听用户的添加提交
    form.on('submit(demo2)', function(data){
        var arrRole =  data.field.roleId.split(",");
        delete data.field.roleId;
       var saveJsonUser =data.field;
        saveJsonUser["useStatus"]= "1";
        saveJsonUser["roleId"]= arrRole[0];
        saveJsonUser["isAdmin"]= arrRole[1];
       saveUser(saveJsonUser);
        return false;
    });
    //自定义验证
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length < 4 || value.length>8) {
                return '用户名必须为4到8位';
            }
            checkUsername(value);
            if(!userNameFlag){
                return '此用户名已被占用';
            }
        }
        ,pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
        ,pwd2:function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value != $("#pwd").val()) {
                return '两次输入密码不一致';
            }
        }
    });
    //验证用户名
    function checkUsername(username) {
        $.ajax({
            type: 'POST',
            url: 'user/getCountByParams',
            async:false,
            data:{'username':username},
            success: function (data) {
                console.log(data);
                if(data>0){
                    userNameFlag = false;
                    /*layer.tips('用户名已存在！！', $("#username"), {tips: [2,'#fc1505'],time:2000,});*/
                }else {
                    userNameFlag = true;
                   /* layer.tips('用户名可使用。。', $("#username"), {tips: [2,'green'],time:2000,});*/
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }
    //加载用户
    function loadAllRoles() {
        $.ajax({
            type: 'POST',
            url: 'roles/loadAll',
            success: function (data) {
                console.log(data);
                var roleStr ='<option value="" selected>-请选择角色-</option>';
                $.each(data,function (i,item) {
                    roleStr += '<option value="'+item.id+','+item.roleName+'">'+item.roleName+'</option>';
                });
                $("#roleId").html(roleStr);
                form.render("select");
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }
    //添加用户
    function saveUser(saveJsonUser) {
        $.ajax({
            type:"POST",
            url:"user/save",
            data:saveJsonUser,
            success:function (data) {
                if(data=="success"){
                    layer.msg('用户信息添加成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                }else {
                    layer.msg('用户信息添加失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});