layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate;

    var currentPage=1;
    //日期时间选择器
    laydate.render({
        elem: '#endDate'
        ,type: 'datetime'
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,value:new Date()
    });
    laydate.render({
        elem: '#endDate1'
        ,type: 'datetime'
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,value:new Date()
    });
    //入住信息的方法级渲染
    table.render({
        elem: '#demo' //数据存放的容器，为table标签，其id="demo"
        ,height: 400
        ,url: 'inRoomInfo/loadPageByParams'
        ,limit:5
        ,limits:[5,10,15,20,25]
        ,even:true
        ,page: true
        ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
            {type:'checkbox'}
            ,{field: 'id', title: 'ID', align:'center', width:80, sort: true}
            ,{field: 'roomNum', title: '房间号', align:'center',width:80,templet:'<div>{{d.rooms.roomNum}}</div>'}
            ,{field: 'roomPic', title: '封面图', width:120, align:'center',sort: true,templet:'<div><img src="{{d.rooms.roomPic}}"/></div>'}
            ,{field: 'roomTypeName', title: '类型', width:120,align:'center',templet:'<div>{{d.rooms.roomType.roomTypeName}}</div>'}
            ,{field: 'roomPrice', title: '价格', width: 80,align:'center', sort: true,templet:'<div>{{d.rooms.roomType.roomPrice}}</div>'}
            ,{field: 'customerName', title: '客人姓名', width: 120,align:'center'}
            ,{field: 'gender', title: '性别', width: 80, align:'center',sort: true,templet: '#genderTpl'}
            ,{field: 'isVip', title: '会员', width: 100, align:'center',sort: true,templet:'#isVipTpl'}
            ,{field: 'idcard', title: '身份证号', width: 180, align:'center',sort: true}
            ,{field: 'phone', title: '手机号', width: 120, align:'center',sort: true}
            ,{field: 'money', title: '押金', width: 80,align:'center'}
            ,{field: 'createDate', title: '入住时间', width: 200,align:'center'}
            ,{field: 'outRoomStatus', title: '状态', width: 80,align:'center',templet: '#outRoomStatusTpl'}
            ,{fixed: 'right',title: '操作', width:160, align:'center', toolbar: '#barDemo'}
        ]],
        done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            currentPage = curr;//当前页码
            hoverOpenImg();  //加载放大镜
        }
    });
    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data;
        var layEvent = obj.event;
        var tr = obj.tr;

        if(layEvent === 'query'){ //查看
            form.val("queryInRoomInfoForm", { //formTest 即 class="layui-formv  所在元素属性 lay-filter="" 对应的值
                "inRoomInfo_id": data.id
                ,"roomNum": data.rooms.roomNum
                ,"customerName": data.customerName
                ,"idcard": data.idcard
                ,"roomPrice": data.rooms.roomType.roomPrice
                ,"createDate": data.createDate
            });
            var beginDateStr1 = getDateStr(data.createDate);
            var endDateStr1 = getDateStr($("#endDate1").val());
            var days1 = getDays(beginDateStr1,endDateStr1);
            if(days1==0){
                days1=1;
            }
            $("#days1").text(days1);
             var zprice1=null;

            if(data.isVip==1){
                $("#isVip1").val("是");
                loadVipByIdCard(data.idcard);
                var price1 = data.rooms.roomType.roomPrice;
                var vipRate1 = $("#vipRate1").val();
                zprice1 = days1*price1*vipRate1;
                $("#zprice1").text(zprice1);
            }else {
                $("#isVip1").val("否");
                var price1 = data.rooms.roomType.roomPrice;
                zprice1 = days1*price1;
                $("#zprice1").text(zprice1);
            }

            $("#otherPrice1").val(0);

            layer.open({
                type:1,
                title:"查看操作界面",
                area:['700px','440px'],
                anim: 4,
                shade:0.5,
                content:$("#queryInRoomInfoDiv")
            });
            $("#otherPrice1").blur(function () {
                var otherPrice1 = parseFloat($(this).val());
                var zoprice1 = zprice1 + otherPrice1;
                $("#zprice1").text(zoprice1);
            });
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                updstatus(obj);
                layer.close(index);
            });
        } else if(layEvent === 'exit'){ //退房
            form.val("exitInRoomInfoForm", { //formTest 即 class="layui-formv  所在元素属性 lay-filter="" 对应的值
                "inRoomInfo_id": data.id
                ,"roomNum": data.rooms.roomNum
                ,"customerName": data.customerName
                ,"idcard": data.idcard
                ,"roomPrice": data.rooms.roomType.roomPrice
                ,"createDate": data.createDate
            });
            //特殊数据回显
            //天数
            var beginDateStr = getDateStr(data.createDate);
            var endDateStr = getDateStr($("#endDate").val());
            var days = getDays(beginDateStr,endDateStr);
            if(days==0){
                days=1;
            }
            $("#days").text(days);
            var zprice=null;
            //房间单价
            var price = data.rooms.roomType.roomPrice;

            if(data.isVip==1){
                $("#isVip").val("是");
                loadVipByIdCard(data.idcard);
                //折扣
                var vipRate = $("#vipRate").val();
                //总价(不包含其他消费)
                zprice = days*price*vipRate;
            }else {
                $("#isVip").val("否");
                //总价(不包含其他消费)
                zprice = days*price;
            }
            //进行总价的回显
            $("#zprice").text(zprice);
            //清空其他消费和备注
            $("#otherPrice").val(0);
            $("#remark").val("");
            //2.弹出退房的操作界面
            layer.open({
                type:1,
                title:"退房操作界面",
                area:['700px','600px'],
                anim: 4,
                shade:0.5,
                content:$("#exitInRoomInfoDiv")
            });
            //3.当用户输入其他金额时，总价发生改变
            $("#otherPrice").blur(function () {
                var otherPrice = parseFloat($(this).val());
                //计算最终消费金额
                var zoprice = zprice + otherPrice;
                $("#zprice").text(zoprice); //填充消费金额
            });
            //4.提交退房监听，监听form表单中的submi提交
            form.on('submit(demo3)', function(data){//submit(demo1)与按钮中的lay-filter="demo1"值保持一致
                console.log(data.field); //打印表单中的数据
                //构建订单添加的参数对象
                var saveJsonOrders = {};
                var nowDate = new Date();  //js中的系统当前时间
                //设置订单添加的相关参数  key:value
                saveJsonOrders['orderNum'] = dateReplace(getNowDate(nowDate))+getRandom(6);
                saveJsonOrders['orderMoney'] = $("#zprice").text();  //订单总价
                saveJsonOrders['remark'] = data.field.remark ; //订单备注
                saveJsonOrders['orderStatus'] = '0';  //订单状态
                saveJsonOrders['iriId'] = data.field.inRoomInfo_id ;//入住信息id
                saveJsonOrders['createDate'] = getNowDate(nowDate);  //设置订单创建时间
                saveJsonOrders['flag'] = '1';  //设置订单是否显示
                //房间编号,客人姓名,入住时间,退房时间,入住天数
                var orderOther = data.field.roomNum+','+data.field.customerName+','+data.field.createDate+','+data.field.endDate+','+$("#days").text();
                saveJsonOrders['orderOther'] = orderOther ;  //退房时的客人信息时间等等
                var orderPrice = data.field.roomPrice+','+data.field.otherPrice+','+zprice;
                saveJsonOrders['orderPrice'] = orderPrice;   //退房时的各种金额
                console.log(saveJsonOrders);
                //异步请求方式添加订单数据
                saveOrders(saveJsonOrders);
                layer.closeAll();  //关闭所有弹框
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        }
    });
    //自定义表单验证
    form.verify({
        otherPrice: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value < 0) {
                return '其他消费金额不能小于0';
            }
        }
    });

    //图片放大镜
    function hoverOpenImg(){
        var img_show = null; // tips提示
        $('td img').hover(function(){
            var img = "<img class='img_msg' src='"+$(this).attr('src')+"' style='width:230px;' />";
            img_show = layer.tips(img, this,{
                tips:[2, 'rgba(41,41,41,.5)']
                ,area: ['260px']
            });
        },function(){
            layer.close(img_show);
        });
        $('td img').attr('style','max-width:70px');
    }

    //修改入住信息显示状态
    function updstatus(obj) {
        $.ajax({
            type:"POST",
            url:"inRoomInfo/updByPrimaryKeySelective",
            data:{
                "id":obj.data.id,
                "status":0
                },
            success:function (data) {
                if(data==='success'){
                    layer.msg('入住信息删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    obj.del();
                }else {
                    layer.msg('入住信息删除失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //根据身份证号查询会员卡号
    function loadVipByIdCard(idcard) {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"vip/loadByParams",   //访问服务器端的路径
            async:false,  //允许ajax外部的变量获得去数据
            data:{"idcard":idcard},  //传到服务器端参数JSON格式数据
            success:function (data) {  //请求执行正常函数回调
                //b.回显会员卡号
                /*退房回显*/
                $("#vipNum").val(data.vipNum);
                $("#vipRate").val(data.vipRate);
                /*查看回显*/
                $("#vipNum1").val(data.vipNum);
                $("#vipRate1").val(data.vipRate);
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
    //添加订单
    function  saveOrders(saveJsonOrders){
        $.ajax({
            type:"POST",
            url:"orders/save",
            data:saveJsonOrders,
            success:function (data) {
                if(data==='success'){
                    layer.msg('退房成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    //刷新表格,重新发送异步请求访问服务器端获取查询数据
                    table.reload('demo', {  //指明具体要重新加载的table容器，容器id
                        page: {
                            curr: currentPage //重新从第 1 页开始
                        }
                    });
                }else {
                    layer.msg('退房失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
    //将目前的时间格式2019/08/06 12:12:08  -->  2019/08/06
    function getDateStr(dateStr) {
        var indexOf = dateStr.indexOf(" ");  //取到" "的下标
        dateStr = dateStr.substring(0,indexOf);  //第1个参数为下标，第2个参数为切割的字符串长度
        return dateStr;
    }

    //计算天数
    function getDays(startDate,endDate){  //2019/09/09   2019/10/10
        var date1Str = startDate.split("/");
        var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
        var date2Str = endDate.split("/");
        var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
        var t1 = date1Obj.getTime();
        var t2 = date2Obj.getTime();
        var datetime=1000*60*60*24;
        var minusDays = Math.floor(((t2-t1)/datetime));
        var days = Math.abs(minusDays);
        return minusDays;
    }
    //获取当前时间字符串     Date()   ---->  yyyy/MM/dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear(); // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds(); //秒
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

    //获取随机数
    function getRandom(num) {
        var count = '';   //随机数
        for (var i=0;i<num;i++){
            count += parseInt(Math.random()*10)  //0.123123123...
        }
        return count;
    }
});