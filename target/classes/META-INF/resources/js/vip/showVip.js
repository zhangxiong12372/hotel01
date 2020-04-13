layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期
    
    //日期时间范围
    laydate.render({
        elem: '#test3'  //日期容器id
        ,type: 'datetime'  //日期的格式类型
        ,range: true  //开启范围选择
    });
    var queryJsonVp = {};

    var phoneFlag = true;

    loadVIp();

    //订单信息的方法级渲染
    function loadVIp() {
        table.render({
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            ,height: 400  //容器高度
            ,url: 'vip/loadPageByParams' //数据接口或者访问服务器端的数据路径
            ,limit:5   //自定义每一页的数据条数
            ,limits:[5,10,15,20,25]
            ,even:true  //逐行背景色深浅不一
            ,where:queryJsonVp
            ,page: true //开启分页
            ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', align:'center', width:80, sort: true}
                ,{field: 'vipNum', title: '会员卡号', align:'center',width:220, sort: true}
                ,{field: 'customerName', title: '会员姓名', width:120, align:'center',edit:'text'}
                ,{field: 'vipRate', title: '会员类型', width:120,align:'center',templet:'#vipRateTpl'}
                ,{field: 'gender', title: '性别', width: 80,align:'center',templet:'#genderTpl'}
                ,{field: 'idcard', title: '身份证号', width: 220,align:'center'}
                ,{field: 'phone', title: '手机号', width: 160, align:'center'}
                ,{field: 'createDate', title: '创建时间', width: 220, align:'center',sort: true}
                ,{fixed: 'right',title: '操作', width:180, align:'center', toolbar: '#barDemo'}
            ]],
            done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调

            }
        });
    }
    //监听订单查询的form表单
    form.on('submit(demo1)', function(data){
        queryJsonVp = data.field;
        //执行条件查询
        loadVIp();
        return false;  //阻止表单进行action提交
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        if(layEvent === 'detail'){ //查看
            layer.msg('查看会员id'+data.id+"会员信息", {icon: 2,time:2000,anim: 6,shade:0.5});
        }  else if(layEvent === 'edit'){ //编辑
            //数据回显
            $("#phone").val(data.phone);
            $("#vip_id").val(data.id);
            var vipRateStr ='';
            if (data.vipRate==0.9){
                vipRateStr = '<option value="0.9" selected>普通会员</option><option value="0.8" >超级会员</option>'
            }else {
                vipRateStr = '<option value="0.9" >普通会员</option><option value="0.8" selected>超级会员</option>'
            }
            $("#vipRate").html(vipRateStr);
            form.render("select");
            //修改弹出层
            layer.open({
                type:1,
                title:"修改会员信息",
                area:['400px','300px'],
                anim: 4,
                shade:0.5,
                content:$("#updVipDiv")
            });
            //提交
            form.on('submit(demo3)', function(data){
                //执行条件查询
                if (phoneFlag){
                   updVip(data.field,obj);
                    layer.closeAll();
                }else {
                    layer.msg('手机号有误', {icon: 3,time:2000,anim: 6,shade:0.5});
                }
                return false;  //阻止表单进行action提交
            });

        }
    });

    //手机号验证
    $("#phone").change(function () {
        checkPhone($(this).val());
    });
    function checkPhone(phone){
        $.ajax({
            type:"POST",
            url:"vip/getCountByParams",
            data:{
                "phone":phone
            },
            success:function (data) {
                if(data>0){
                    phoneFlag = false;
                    layer.tips('手机号已使用！！',$("#phone"), {tips: [2,'#fc1505'],time:2000});
                }else {
                    phoneFlag = true;
                    layer.tips('手机号可以使用！！',$("#phone"), {tips: [2,'#fc1505'],time:2000});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
    //单元格修改
    table.on('edit(test)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        console.log(obj.value); //得到修改后的值
        console.log(obj.field); //当前编辑的字段名
        console.log(obj.data); //所在行的所有相关数据
        var updJsonVip = {};
        updJsonVip[obj.field] = obj.value;
        updJsonVip["id"]= obj.data.id;
        updVip(updJsonVip,"customerName");
    });
    //修改会员信息
    function updVip(updJsonVip,obj) {
        $.ajax({
            type:"POST",
            url:"vip/updByPrimaryKeySelective",
            data:updJsonVip,
            success:function (data) {
                if(data==='success'){
                    layer.msg('会员信息修改成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    if (obj!="customerName"){
                        //同步更新缓存对应的值
                        obj.update({
                            vipRate: updJsonVip.vipRate
                            ,phone: updJsonVip.phone
                        });
                    }
                }else {
                    layer.msg('会员信息修改失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});