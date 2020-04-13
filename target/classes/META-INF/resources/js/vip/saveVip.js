layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //做手机号和身份证号验证标记
    var idcardFlag = false;
    var phoneFlag = false;

    //身份证号验证
    $("#idcard").blur(function () {
        //开启验证
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test($(this).val())){  //正则表达式的验证
            checkIdCard($(this).val());
        }else {
            layer.tips('身份证号格式错误', $("#idcard"), {tips: [2,'#fc1505'],time:2000,});
        }

    });

    //手机号验证
    $("#phone").blur(function () {
        //开启验证
        var reg = /^1[3456789]\d{9}$/;
        if(reg.test($(this).val())){  //正则验证
            checkPhone($(this).val());
        }else {
            layer.tips('手机号格式不正确！！', $("#phone"), {tips: [2,'#fc1505'],time:2000,});
        }

    });

    //监听下拉框生成会员卡号
    form.on('select(vipRate)', function(data){
        var nowDate = new Date();
        $("#createDate").val(getNowDate(nowDate));
        var vipNum = dateReplace(getNowDate(nowDate));
        if(data.value==0.8){
            vipNum += '01';
        }else {
            vipNum += '02';
        }
        $("#vipNum").val(vipNum);
    });

    //监听会员的添加提交
    form.on('submit(demo2)', function(data){
        if(idcardFlag && phoneFlag){
            saveVip(data.field);
            layer.closeAll();
        }else if(!idcardFlag && phoneFlag){
            layer.msg('身份证号已被使用！！', {icon: 2,time:2000,anim: 6,shade:0.5});
        }else if(idcardFlag && !phoneFlag){
            layer.msg('手机号已被使用！！', {icon: 2,time:2000,anim: 6,shade:0.5});
        }else {
            layer.msg('身份证号手机号均被使用！！', {icon: 2,time:2000,anim: 6,shade:0.5});
        }
        return false;
    });

    //验证身份证号
    function checkIdCard(idcard) {
        $.ajax({
            type:"POST",
            url:"vip/getCountByParams",
            data:{"idcard":idcard},
            async:false,
            success:function (data) {
                if(data>0){
                    idcardFlag = false;
                    layer.tips('身份证号已使用！！', $("#idcard"), {tips: [2,'#fc1505'],time:2000,});
                }else {
                    idcardFlag = true;
                    layer.tips('身份证号可用。。', $("#idcard"), {tips: [2,'green'],time:2000,});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //验证身份证号
    function checkPhone(phone) {
        $.ajax({
            type:"POST",
            url:"vip/getCountByParams",
            data:{"phone":phone},
            async:false,
            success:function (data) {  
                if(data>0){
                    phoneFlag = false;
                    layer.tips('手机号已使用！！', $("#phone"), {tips: [2,'#fc1505'],time:2000,});
                }else {
                    phoneFlag = true;
                    layer.tips('手机号可用。。', $("#phone"), {tips: [2,'green'],time:2000,});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //添加会员数据
    function saveVip(saveJsonVip) {
        $.ajax({
            type:"POST",
            url:"vip/save",
            data:saveJsonVip,
            success:function (data) {
                if(data=="success"){
                    layer.msg('会员信息添加成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    setTimeout('window.location = "model/toShowVip"',2000);
                }else {
                    layer.msg('会员信息添加失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //获取当前时间字符串     Date()   ---->  yyyy/MM/dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }

});